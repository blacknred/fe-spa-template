import type { Role, User } from '@/features/users';
import { create } from 'zustand';
import { getAuth } from '../api/getAuth';
import { updateAuth } from '../api/updateAuth';

const ACCESS_TOKEN_LIFESPAN = 5 * 60 * 1000;

let timerRef: NodeJS.Timer;

export type AuthStore = {
  profile: User | null;
  setProfile: (profile: User) => void;
  checkRole: (roles: Role[]) => boolean;
  startSession: () => Promise<unknown>;
  clearSession: () => void;
}

export const useAuth = create<AuthStore>()((set, get) => ({
  profile: null,
  setProfile: (profile: User) => set({ profile }),
  checkRole: (roles) => {
    const role = get().profile?.role;
    if (!roles.length) return true;
    if (!role) return false;
    return roles.includes(role);
  },
  startSession: () => getAuth()
    .then((res) => {
      if (res.ok) return res.json();
      throw res.statusText
    })
    .then(get().setProfile)
    .then(() => {
      clearInterval(timerRef);
      timerRef = setInterval(updateAuth, ACCESS_TOKEN_LIFESPAN);
      return null;
    })
    .catch(() => null),
  clearSession: () => {
    clearInterval(timerRef);
    set(() => ({ profile: null }));
  },
}))
