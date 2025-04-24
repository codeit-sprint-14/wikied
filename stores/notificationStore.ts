import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface NotificationState {
  notification: any;
  fetchNotification: (accessToken: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    set => ({
      notification: null,
      fetchNotification: async accessToken => {
        try {
          const response = await axios.get(
            'https://wikied-api.vercel.app/14-6/notifications?page=1&pageSize=10',
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          set({ notification: response.data });
        } catch (err) {
          console.error('알림 get 오류:', err);
        }
      },
    }),
    {
      name: 'wikied-notification',
    }
  )
);
