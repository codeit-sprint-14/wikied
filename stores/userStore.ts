import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface UserState {
  userData: any;
  fetchUserData: (accessToken: string) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      userData: null,
      fetchUserData: async accessToken => {
        try {
          const response = await axios.get('https://wikied-api.vercel.app/14-6/users/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          set({ userData: response.data });
        } catch (err) {
          console.log('유저 데이터 get 오류:', err);
        }
      },
    }),
    {
      name: 'wikied-user',
    }
  )
);
