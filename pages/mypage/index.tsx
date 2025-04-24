import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import SignInput from '@/components/feature/SignInput';
import useInputConfirm from '@/hooks/useInputConfirm';
import { useNotificationStore } from '@/stores/notificationStore';
import { useUserStore } from '@/stores/userStore';
import typo from '@/utils/typo';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;

  form {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  h1 {
    ${typo('48sb')};
  }
`;

export default function Mypage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const oldPw = useInputConfirm();
  const pw = useInputConfirm();
  const confirmPw = useInputConfirm(pw.value);

  const { userData, fetchUserData } = useUserStore();
  const { notification, fetchNotification } = useNotificationStore();
  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (status !== 'authenticated' || !session?.accessToken) {
      setIsLoading(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const oldPassword = formData.get('oldPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const newPasswordConfirmation = formData.get('newPasswordConfirmation') as string;

    try {
      const response = await axios.patch(
        'https://wikied-api.vercel.app/14-6/users/me/password',
        {
          currentPassword: oldPassword,
          password: newPassword,
          passwordConfirmation: newPasswordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      console.log('비번 변경 성공:', response.data);
      oldPw.value = '';
      pw.value = '';
      confirmPw.value = '';
      setError('비밀번호가 변경되었어요');
    } catch (err) {
      console.error(err);
      setError('비밀번호가 틀렸어요');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWikiSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const question = formData.get('question') as string;
    const answer = formData.get('answer') as string;

    try {
      const response = await axios.post(
        'https://wikied-api.vercel.app/14-6/profiles',
        {
          securityQuestion: question,
          securityAnswer: answer,
        },
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );
      console.log('위키 생성 성공:', response.data);
      fetchUserData(session.accessToken);
      const code = response.data.code;
      router.push(`/wiki/${code}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status !== 'authenticated' || !session?.accessToken) {
      setIsLoading(false);
      router.push('/login');
      return;
    }
  }, [status, session, router, handlePasswordSubmit, handleWikiSubmit]);

  return (
    <Container>
      <h1>안녕하세요, {session?.user?.name}님</h1>
      <span>{`세션 데이터 : ${JSON.stringify(session?.user)}`}</span>
      <span>{`유저 데이터 : ${JSON.stringify(userData)}`}</span>
      <span>{`유저 알림 : ${JSON.stringify(notification)}`}</span>
      <form onSubmit={handlePasswordSubmit}>
        비밀번호 변경
        <SignInput
          inputState={oldPw}
          name={'oldPassword'}
          placeholder={'기존 비밀번호'}
          type={'password'}
          title={'비밀번호'}
          autoComplete={'new-password'}
          id={'password'}
          pw={oldPw.value}
          value={oldPw.value}
          onChange={oldPw.onChange}
        />
        <SignInput
          inputState={pw}
          name={'newPassword'}
          placeholder={'새 비밀번호'}
          type={'password'}
          title={'비밀번호'}
          autoComplete={'new-password'}
          id={'password'}
          pw={pw.value}
          value={pw.value}
          onChange={pw.onChange}
        />
        <SignInput
          inputState={confirmPw}
          name={'newPasswordConfirmation'}
          placeholder={'새 비밀번호 확인'}
          type={'password'}
          title={'비밀번호 확인'}
          autoComplete={'new-password'}
          id={'passwordConfirmation'}
          pw={pw.value}
        />
        <Button type="submit" width="100%">
          변경하기
        </Button>
        <span>{error}</span>
      </form>
      <hr />
      {userData?.profile?.code ? (
        <Button onClick={() => router.push(`/wiki/${userData?.profile?.code}`)}>
          내 위키 보러가기
        </Button>
      ) : (
        <form onSubmit={handleWikiSubmit}>
          위키 생성하기
          <Input name="question" placeholder="질문을 입력해주세요" />
          <Input name="answer" placeholder="답변을 입력해주세요" />
          <Button type="submit" width="100%">
            생성하기
          </Button>
        </form>
      )}
    </Container>
  );
}
