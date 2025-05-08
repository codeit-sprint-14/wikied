import Button from '@/components/common/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Sign from '@/styles/sign';
import { signIn } from 'next-auth/react';
import useInputConfirm from '@/hooks/useInputConfirm';
import SignInput from '@/components/feature/SignInput';
import LogoDark from '@/public/icons/ico-logo-dark.svg';
import Image from 'next/image';

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const email = useInputConfirm();
  const pw = useInputConfirm();

  function passInputs() {
    if (email.msg || pw.msg) {
      return false;
    }

    return true;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

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
      <div className="form-container">
        <form className="sign-container" onSubmit={handleSubmit}>
          <Image src={LogoDark} className="logo" alt="logo" width={107} height={30} />
          <span>로그인</span>
          <h1>어서와요</h1>
          <SignInput
            inputState={email}
            name={'email'}
            type={'text'}
            title={'이메일'}
            autoComplete={'email'}
            id={'email'}
            required
          />
          <SignInput
            inputState={pw}
            name={'password'}
            type={'password'}
            title={'비밀번호'}
            autoComplete={'new-password'}
            id={'password'}
            pw={pw.value}
            value={pw.value}
            onChange={pw.onChange}
            required
          />
          <Button
            className="login-btn"
            type="submit"
            width="100%"
            height="48px"
            disabled={!passInputs()}
          >
            로그인
          </Button>
          <span className="error-msg">{error && '아이디/비밀번호가 틀렸어요'}</span>

          <div className="divider-container">
            <hr />
            <span>또는</span>
            <hr />
          </div>
          <div className="social-container">
            <button id="google" className="social-btn" onClick={() => signIn('google')} />
            <button id="naver" className="social-btn" onClick={() => signIn('naver')} />
            <button id="kakao" className="social-btn" onClick={() => signIn('kakao')} />
          </div>

          <span className="signup-link">
            위키드가 처음이신가요?{' '}
            <Link href="/signup" className="signup-link-bold">
              10초만에 가입하기
            </Link>
          </span>
        </form>
      </div>
    </Sign>
  );
}
