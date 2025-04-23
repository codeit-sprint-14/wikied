import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Sign from '@/styles/sign';

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const passwordConfirmation = formData.get('passwordConfirmation') as string;

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

    try {
      const response = await axios.post('https://wikied-api.vercel.app/14-6/auth/signUp', {
        email,
        name,
        password,
        passwordConfirmation,
      });
      console.log('API Success Response:', response.data);
    } catch (err) {
      console.error(err);
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sign>
      <form className="signContainer" onSubmit={handleSubmit}>
        <h1>반가워요</h1>
        <label htmlFor="name">
          이름
          <Input name="name" id="name" type="text" placeholder="이름을 입력해주세요" />
        </label>
        <label htmlFor="email">
          이메일
          <Input name="email" id="email" type="email" placeholder="이메일을 입력해주세요" />
        </label>
        <label htmlFor="password">
          비밀번호
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
        </label>
        <label htmlFor="passwordConfirmation">
          비밀번호 확인
          <Input
            name="passwordConfirmation"
            id="passwordConfirmation"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
          />
        </label>
        <Button type="submit" width="100%">
          가입하기
        </Button>

        <span>
          이미 회원이신가요? <Link href="/login">로그인하기</Link>
        </span>
      </form>
    </Sign>
  );
}
