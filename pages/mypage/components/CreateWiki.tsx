import Button from '@/components/common/Button';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Input from '@/components/common/Input';
export default function CreateWiki({ isLoading, setIsLoading }) {
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
      fetchUserData(session?.accessToken);
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
    </>
  );
}
