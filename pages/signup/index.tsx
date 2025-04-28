import Button from '@/components/common/Button';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Sign from '@/styles/sign';
import SignInput from '@/components/feature/SignInput';
import useInputConfirm from '@/hooks/useInputConfirm';
import { signIn } from 'next-auth/react';

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const email = useInputConfirm();
  const pw = useInputConfirm();
  const confirmPw = useInputConfirm(pw.value);
  const userName = useInputConfirm();

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
      console.error(err);
      setError('이미 존재하는 이메일입니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sign>
      <form className="signContainer" onSubmit={handleSubmit}>
        <h1>반가워요</h1>
        <SignInput
          inputState={userName}
          name={'name'}
          placeholder={'이름을 입력해주세요'}
          type={'text'}
          title={'이름'}
          autoComplete={'username'}
          id={'name'}
          required
        />
        <SignInput
          inputState={email}
          name={'email'}
          placeholder={'이메일을 입력해주세요'}
          type={'text'}
          title={'이메일'}
          autoComplete={'email'}
          id={'email'}
          required
        />
        <SignInput
          inputState={pw}
          name={'password'}
          placeholder={'비밀번호를 입력해주세요'}
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
          placeholder={'비밀번호를 다시 한 번 입력해주세요'}
          type={'password'}
          title={'비밀번호 확인'}
          autoComplete={'new-password'}
          id={'passwordConfirmation'}
          pw={pw.value}
          required
        />
        <Button disabled={!passInputs()} type="submit" width="100%">
          가입하기
        </Button>

        <span>
          이미 회원이신가요? <Link href="/login">로그인하기</Link>
        </span>
      </form>
    </Sign>
  );
}
