import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface NotificationState {
  notification: {
    totalCount: number;
    list: {
      id: number;
      content: string;
      createdAt: string;
    }[];
  };
  fetchNotification: (accessToken: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    set => ({
      notification: {
        totalCount: 0,
        list: [],
      },
      fetchNotification: async accessToken => {
        if (!accessToken) return;

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
          console.log('알림 get 오류:', err);
        }
      },
    }),
    {
      name: 'wikied-notification',
    }
  )
);
