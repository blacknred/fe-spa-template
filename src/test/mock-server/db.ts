import { IS_TEST } from '@/config';
import { Role } from '@/features/users';
import { factory, nullable, primaryKey } from '@mswjs/data';
import { DATABASE_INSTANCE, KeyType } from '@mswjs/data/lib/glossary';

const DB_KEY = 'msw-db';

const models = {
  user: {
    id: primaryKey(Number),
    name: String,
    email: String,
    phone: nullable(String),
    city: nullable(String),
    image: nullable(String),
    password: String,
    role: () => Role.admin,
    online: () => false,
    createdAt: () => new Date().toISOString(),
    updatedAt: () => new Date().toISOString(),
  },
  category: {
    id: primaryKey(Number),
    name: String,
    image: String,
    authorId: Number,
    createdAt: () => new Date().toISOString(),
    updatedAt: () => new Date().toISOString(),
  },
  product: {
    id: primaryKey(Number),
    name: String,
    description: String,
    categoryId: Number,
    authorId: Number,
    price: Number,
    quantity: Number,
    preview: String,
    images: Array,
    barcode: () => Date.now(),
    createdAt: () => new Date().toISOString(),
    updatedAt: () => new Date().toISOString(),
  },
};

export const db = factory(models);

export type Model = keyof typeof db;

export const loadDb = () =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  JSON.parse(window.localStorage.getItem(DB_KEY) || '{}');

export const resetDb = () => window.localStorage.clear();

export const initializeDb = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const database = loadDb();
  console.table(database);

  Object.entries(db).forEach(([key, model]) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    database[key]?.forEach((entry: Record<string, unknown>) => {
      model.create(entry);
    });
  });

  if (IS_TEST) return;

  db[DATABASE_INSTANCE].events.addListener('create', persister);
  db[DATABASE_INSTANCE].events.addListener('delete', persister);
  db[DATABASE_INSTANCE].events.addListener('update', persister);
};

function persister(_: unknown, model: KeyType) {
  const key = model as Model & string;
  queueMicrotask(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const database = loadDb();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    database[key] = db[key].getAll();

    window.localStorage.setItem(DB_KEY, JSON.stringify(database));
  });
}

initializeDb();
