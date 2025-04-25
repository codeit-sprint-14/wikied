import Button from '@/components/common/Button';

import SignInput from '@/components/feature/SignInput';
import useInputConfirm from '@/hooks/useInputConfirm';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';

export default function ChangePassword({ isLoading, setIsLoading }) {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const oldPw = useInputConfirm();
  const pw = useInputConfirm();
  const confirmPw = useInputConfirm(pw.value);

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
      console.log(err.response.data.message);

      if (err.response.data.message === 'jwt expired') {
        signOut();
        router.push('/login');
      } else {
        setError('비밀번호가 틀렸어요');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
}
