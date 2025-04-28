import { useSession, signIn, signOut } from 'next-auth/react';
import Button from './Button';
import Link from 'next/link';
import styled from 'styled-components';
import color from '@/utils/color';
import Logo from '@/public/icons/ico-logo.svg';
import Image from 'next/image';

const GNBContainer = styled.nav`
  position: fixed;
  display: flex;
  width: 100vw;
  top: 0;
  height: 80px;
  overflow: hidden;
  padding: 20px 80px;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  background: ${color('gray50')};
  align-items: center;
  gap: 40px;

  :nth-child(3) {
    flex-grow: 1;
  }
`;

export default function GNB() {
  const { data: session, status } = useSession();

  return (
    <GNBContainer>
      <Image src={Logo} width="107px" />
      <Link href="/wikilist">위키목록</Link>
      <Link href="/boards">자유게시판</Link>
      {session ? (
        <>
          <Link href="/mypage">안녕 {session.user.name || '홍길동'}</Link>
          <Button onClick={() => signOut()}>로그아웃</Button>
        </>
      ) : (
        <Button onClick={() => signIn()}>로그인</Button>
      )}
    </GNBContainer>
  );
}
