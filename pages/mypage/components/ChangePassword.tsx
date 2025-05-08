import Button from '@/components/common/Button';

import SignInput from '@/components/feature/SignInput';
import useInputConfirm from '@/hooks/useInputConfirm';
import color from '@/utils/color';
import typo from '@/utils/typo';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import router from 'next/router';
import { useState } from 'react';
import styled, { css } from 'styled-components';

import Lock from '@/public/icons/ico-lock.svg';
import Check from '@/public/icons/ico-check.svg';
import Image from 'next/image';

const Form = styled.form<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  transition: all 0.2s cubic-bezier(0, 0.5, 0.5, 1);
  height: ${({ isOpen }) => (isOpen ? '480px' : '128px')};
  cursor: ${({ isOpen }) => (isOpen ? 'default' : 'pointer')};
  background: ${color('gray100')};
  border-radius: 20px;
  padding: 20px 40px;

  @media (max-width: 480px) {
    height: ${({ isOpen }) => (isOpen ? '480px' : '96px')};
  }
  label {
    ${typo('24sb')}
    color: ${color('gray500')};
    margin-bottom: 48px;
    margin-top: ${({ isOpen }) => (isOpen ? '0' : '12px')};
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    img {
      transition: all 0.1s cubic-bezier(0, 0.5, 0.5, 1);
      width: 68px;
      height: 68px;
      pointer-events: none;
      opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};

      @media (max-width: 480px) {
        width: 32px;
        height: 32px;
      }
    }
  }
  &:hover {
    filter: ${({ isOpen }) => (isOpen ? 'none' : 'brightness(0.97)')};
  }

  .bottom-container {
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    .cancel-button {
      ${typo('14m')};
      color: ${color('gray400')};
      background: none;
      border: none;
      cursor: pointer;
    }
  }
`;

export default function ChangePassword({
  isLoading,
  setIsLoading,
  className,
}: {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  className: string;
}) {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const oldPw = useInputConfirm();
  const pw = useInputConfirm();
  const confirmPw = useInputConfirm(pw.value);
  const [isOpen, setIsOpen] = useState(false);

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
      setIsOpen(false);
      oldPw.onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
      pw.onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
      confirmPw.onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    } catch (err: any) {
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
    <Form onSubmit={handlePasswordSubmit} isOpen={isOpen} className={className}>
      <label
        onClick={() => {
          setIsOpen(prev => !prev);
        }}
      >
        {error === '비밀번호가 변경되었어요' && !isOpen ? (
          <>
            <h2>비밀번호가 변경되었어요</h2>
            <Image src={Check} alt="check" />
          </>
        ) : (
          <>
            <h2>비밀번호 변경</h2>
            <Image src={Lock} alt="lock" />
          </>
        )}
      </label>
      <SignInput
        inputState={oldPw}
        name={'oldPassword'}
        type={'password'}
        title={'현재 비밀번호'}
        autoComplete={'new-password'}
        id={'password'}
        pw={oldPw.value}
        value={oldPw.value}
        onChange={oldPw.onChange}
        required
      />
      <SignInput
        inputState={pw}
        name={'newPassword'}
        type={'password'}
        title={'새 비밀번호'}
        autoComplete={'new-password'}
        id={'password'}
        pw={pw.value}
        value={pw.value}
        onChange={pw.onChange}
        required
      />
      <SignInput
        inputState={confirmPw}
        name={'newPasswordConfirmation'}
        type={'password'}
        title={'새 비밀번호 확인'}
        autoComplete={'new-password'}
        id={'passwordConfirmation'}
        pw={pw.value}
        required
      />
      <div className="bottom-container">
        <button className="cancel-button" onClick={() => setIsOpen(false)} type="button">
          취소
        </button>
        <Button type="submit" width="90px">
          변경하기
        </Button>
      </div>
      <span>{error}</span>
    </Form>
  );
}
