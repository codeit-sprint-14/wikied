import Button from '@/components/common/Button';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Input from '@/components/common/Input';
import styled from 'styled-components';
import color from '@/utils/color';
import typo from '@/utils/typo';
import Image from 'next/image';

import Magic from '@/public/icons/ico-magic.svg';

const GoToWiki = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* width: 480px; */
  height: 128px;

  padding: 20px 40px;
  border: none;
  border-radius: 20px;

  transition: all 0.1s cubic-bezier(0, 0.5, 0.5, 1);

  background: ${color('gray100')};

  overflow: hidden;
  cursor: pointer;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  h2 {
    ${typo('24sb')}
    color: ${color('gray500')};
  }

  span {
    ${typo('14m')}
    color: ${color('gray400')};
  }

  img {
    transition: all 0.1s cubic-bezier(0, 0.5, 0.5, 1);
    width: 68px;
    height: 68px;
    pointer-events: none;
  }
  @media (max-width: 480px) {
    height: 96px;

    img {
      width: 32px;
      height: 32px;
    }
  }

  &:hover {
    filter: brightness(0.97);
  }
`;

export default function CreateWiki({
  isLoading,
  setIsLoading,
  className,
}: {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  className: string;
}) {
  const router = useRouter();
  const { userData, fetchUserData } = useUserStore();
  const { data: session, status } = useSession();

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
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      console.log('위키 생성 성공:', response.data);
      fetchUserData(session?.accessToken || '');
      const code = response.data.code;
      router.push(`/wiki/${code}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {userData?.profile?.code ? (
        <GoToWiki
          onClick={() => router.push(`/wiki/${userData?.profile?.code}`)}
          className={className}
        >
          <div>
            <h2>내 위키 보러가기</h2>
            <span>{session?.user?.name}님의 위키 페이지로 이동해요</span>
          </div>
          <Image src={Magic} alt="magic" />
        </GoToWiki>
      ) : (
        <form onSubmit={handleWikiSubmit} className={className}>
          <Input name="question" placeholder="질문을 입력해주세요" required />
          <Input name="answer" placeholder="답변을 입력해주세요" required />
          <Button type="submit" width="100%">
            생성하기
          </Button>
        </form>
      )}
    </>
  );
}
