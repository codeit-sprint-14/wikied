import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sign from '@/styles/sign';
import { signIn, useSession } from 'next-auth/react';

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

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
      const result = await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      });

      setIsLoading(false);

      if (result?.ok && !result?.error) {
        router.push('/');
      } else {
        console.error('NextAuth 로그인 실패:', result?.error);
        setError(result?.error || '이메일 또는 비밀번호가 잘못되었습니다.');
      }
    } catch (err) {
      console.error(err);
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
    }
  };

  return (
    <Sign>
      <form className="signContainer" onSubmit={handleSubmit}>
        <h1>어서와요</h1>
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
        <Button type="submit" width="100%">
          로그인
        </Button>

        <Button onClick={() => signIn('google')} variant="outline" width="100%">
          구글
        </Button>
        <Button onClick={() => signIn('naver')} variant="outline" width="100%">
          네이버
        </Button>
        <Button onClick={() => signIn('kakao')} variant="outline" width="100%">
          카카오
        </Button>

        <span>
          위키드가 처음이신가요? <Link href="/signup">10초만에 가입하기</Link>
        </span>
      </form>
    </Sign>
  );
}
