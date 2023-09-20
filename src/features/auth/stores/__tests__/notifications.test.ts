import { act, renderHook } from '@testing-library/react-hooks';
import { Notification, useNotificationStore } from '../notifications';

import timers from 'timers/promises';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type Notification = {
  id: number;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message?: string;
};

type NotificationsStore = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  dismissNotification: (id: number) => void;
  add: (notification: Omit<Notification, 'id'>) => Promise<void>;
};

export const useNotificationStore = create<NotificationsStore>()(
  devtools(
    persist(
      (set) => ({
        notifications: [],
        addNotification: (notification) =>
          set((state) => ({
            notifications: [
              ...state.notifications,
              { id: Math.random() * 30, ...notification },
            ],
          })),
        dismissNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.filter(
              (notification) => notification.id !== id,
            ),
          })),
        add: async (notification) => {
          const newId = Math.random() * 30;
          set((state) => ({
            notifications: [
              ...state.notifications,
              { id: newId, ...notification },
            ],
          }));
          await timers.setTimeout(1000);
          set((state) => ({
            notifications: state.notifications.filter(({ id }) => newId !== id),
          }));
        },
      }),
      { name: 'notifications' },
    ),
    { name: 'Notifications', trace: true },
  ),
);



void test('should add and remove notifications', () => {
  const { result } = renderHook(() => useNotificationStore());

  expect(result.current.notifications.length).toBe(0);

  const notification: Notification = {
    id: 123,
    title: 'Hello World',
    type: 'info',
    message: 'This is a notification',
  };

  act(() => {
    result.current.addNotification(notification);
  });

  expect(result.current.notifications).toContainEqual(notification);

  act(() => {
    result.current.dismissNotification(notification.id);
  });

  expect(result.current.notifications).not.toContainEqual(notification);
});
