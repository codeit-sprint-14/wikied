import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import typo from '@/utils/typo';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
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

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const oldPassword = formData.get('password') as string;
    const newPassword = formData.get('password') as string;
    const newPasswordConfirmation = formData.get('passwordConfirmation') as string;

    // if (password !== passwordConfirmation) {
    //   setError('비밀번호가 일치하지 않습니다.');
    //   setIsLoading(false);
    //   return;
    // }
    // if (password.length < 6) {
    //   setError('비밀번호는 6자 이상이어야 합니다.');
    //   setIsLoading(false);
    //   return;
    // }

    // {
    //     "passwordConfirmation": "password",
    //     "password": "password",
    //     "currentPassword": "password"
    // }

    try {
      const response = await axios.patch(
        'https://wikied-api.vercel.app/14-6/users/me/password',
        {
          currentPassword: oldPassword,
          password: newPassword,
          passwordConfirmation: newPasswordConfirmation,
        },
        {
          withCredentials: true,
        }
      );
      console.log('API Success Response:', response.data);
    } catch (err) {
      console.error(err);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h1>계정 설정</h1>
      <form onSubmit={handlePasswordSubmit}>
        비밀번호 변경
        <Input type="password" placeholder="기존 비밀번호" />
        <Input type="password" placeholder="새 비밀번호" />
        <Input type="password" placeholder="새 비밀번호 확인" />
        <Button type="submit" width="100%">
          변경하기
        </Button>
      </form>
      <hr />
      <form>
        위키 생성하기
        <Input placeholder="질문을 입력해주세요" />
        <Input placeholder="답변을 입력해주세요" />
        <Button type="submit" width="100%">
          생성하기
        </Button>
      </form>
    </Container>
  );
}
