import Button from '@/components/common/Button';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Sign from '@/styles/sign';
import SignInput from '@/components/feature/SignInput';
import useInputConfirm from '@/hooks/useInputConfirm';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import LogoDark from '@/public/icons/ico-logo-dark.svg';

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const email = useInputConfirm();
  const pw = useInputConfirm();
  const confirmPw = useInputConfirm('', pw.value);
  const userName = useInputConfirm(error, '');

  function passInputs() {
    if (email.msg || pw.msg || confirmPw.msg || userName.msg) {
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
    const name = formData.get('name') as string;
    const password = formData.get('password') as string;
    const passwordConfirmation = formData.get('passwordConfirmation') as string;

    try {
      const response = await axios.post('https://wikied-api.vercel.app/14-6/auth/signUp', {
        email,
        name,
        password,
        passwordConfirmation,
      });
      console.log('API Success Response:', response.data);

      await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
      });

      router.push('/');

      router.push('/login');
    } catch (err) {
      setError('이미 존재하는 닉네임입니다.');
      console.log(error, '라고 말해야함');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sign>
      <div className="form-container">
        <form className="sign-container" onSubmit={handleSubmit}>
          <Image src={LogoDark} className="logo" alt="logo" width={107} height={30} />
          <span>회원가입</span>
          <h1>반가워요</h1>
          <SignInput
            inputState={userName}
            name={'name'}
            type={'text'}
            title={'닉네임'}
            autoComplete={'username'}
            id={'name'}
            msg={error}
            required
          />
          <SignInput
            inputState={email}
            name={'email'}
            type={'text'}
            title={'이메일'}
            autoComplete={'email'}
            id={'email'}
            required
          />
          <br />
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
          <SignInput
            inputState={confirmPw}
            name={'passwordConfirmation'}
            type={'password'}
            title={'비밀번호 확인'}
            autoComplete={'new-password'}
            id={'passwordConfirmation'}
            pw={pw.value}
            required
          />
          <br />
          <Button disabled={!passInputs()} type="submit" width="100%" height="48px">
            가입하기
          </Button>
          <span className="signup-link">
            이미 회원이신가요?{' '}
            <Link href="/login" className="signup-link-bold">
              로그인하기
            </Link>
          </span>
        </form>
      </div>
    </Sign>
  );
}
