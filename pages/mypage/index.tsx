import { useNotificationStore } from '@/stores/notificationStore';
import { useUserStore } from '@/stores/userStore';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import * as S from './style';
import ChangePassword from './components/ChangePassword';
import CreateWiki from './components/CreateWiki';

export default function Mypage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const { userData } = useUserStore();
  const { notification } = useNotificationStore();

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      console.log(`session : ${session}`);
      if (!session?.accessToken) {
        setIsLoading(false);
        console.log(`status : ${status}`);
        console.log(`session : ${session}`);
        router.push('/login');
        return;
      }
    }
    checkSession();
  }, [status, session, router]);

  return (
    <S.Container>
      <h1>안녕하세요, {session?.user?.name}님</h1>
      <span>{`세션 데이터 : ${JSON.stringify(session?.user)}`}</span>
      <span>{`유저 데이터 : ${JSON.stringify(userData)}`}</span>
      <span>{`유저 알림 : ${JSON.stringify(notification)}`}</span>
      <ChangePassword isLoading={isLoading} setIsLoading={setIsLoading} />
      <hr />
      <CreateWiki isLoading={isLoading} setIsLoading={setIsLoading} />
    </S.Container>
  );
}
