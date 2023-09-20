import { BaseEntity } from "@/types";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { useIntl } from "react-intl";

type TableColumn<T> = {
  title: string;
  onSort?: (field: keyof T) => void;
  field: keyof T;
  cell?({ entry }: { entry: T }): React.ReactNode;
};

type Props<T> = {
  data: T[];
  columns: TableColumn<T>[];
};

export const Table = <T extends BaseEntity>({ data, columns }: Props<T>) => {
  const intl = useIntl();

  if (!data?.length) {
    return (
      <div className="flex flex-col items-center justify-center bg-white dark:bg-black h-80">
        <ExclamationCircleIcon className="w-10 h-10" />
        <h4>{intl.formatMessage({ id: 'ui.empty' })}</h4>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      scope="col"
                      key={`${column.title} + ${index}`}
                      className="px-6 py-3 text-xs font-bold tracking-wider text-left uppercase"
                    >
                      {column.title}
                      {column.onSort && <ChevronUpDownIcon onClick={() => column.onSort?.(column.field)} className="inline cursor-pointer w-5 h-5" />}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((entry) => (
                  <tr key={entry.id} className="odd:bg-white dark:odd:bg-gray-600 even:bg-gray-100 dark:even:bg-gray-800">
                    {columns.map(({ cell: Cell, field, title }, colIdx) => (
                      <td
                        key={`${title} + ${colIdx}`}
                        className="px-6 py-4 text-sm font-medium whitespace-nowrap"
                      >
                        {(Cell ? <Cell entry={entry} /> : entry[field] + '') || '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

