import { useSession, signIn, signOut } from 'next-auth/react';
import Button from './Button';
import Link from 'next/link';
import styled from 'styled-components';
import color from '@/utils/color';
import Logo from '@/public/icons/ico-logo.svg';
import Profile from '@/public/icons/ico-profile.svg';
import Alarm from '@/public/icons/ico-alarm.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MenuContainer, MenuItem } from '@/components/common/Menu';
import typo from '@/utils/typo';

const GNBContainer = styled.nav`
  position: fixed;
  display: flex;
  width: 100vw;
  height: 80px;
  padding: 20px 80px;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  background: ${color('gray50')};
  align-items: center;
  gap: 40px;

  .profile {
    border-radius: 100px;
    border: 1px solid ${color('gray100')};
  }

  :nth-child(3) {
    flex-grow: 1;
  }

  .right-container {
    display: flex;
    align-items: center;
    gap: 24px;

    .alarm {
      cursor: pointer;
    }

    .login-button {
      ${typo('14m')};
      color: ${color('gray400')};
      cursor: pointer;
    }
  }
`;

const ProfileContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

function Menu({ isOpen }: { isOpen: boolean }) {
  return (
    <MenuContainer isOpen={isOpen}>
      <MenuItem>
        <Link href="/mypage">계정 설정</Link>
      </MenuItem>
      <MenuItem>
        <Link href="/mypage">내 위키</Link>
      </MenuItem>
      <MenuItem onClick={() => signOut()}>로그아웃</MenuItem>
    </MenuContainer>
  );
}

export default function GNB() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    if (session) {
      session.user?.image && setProfile(session.user.image);
      typeof session.user?.profile === 'string' && setProfile(session.user.profile);
    }
  }, [session]);

  const handleProfileClick = () => {
    setIsProfileMenuOpen(prev => !prev);
  };

  return (
    <GNBContainer>
      <Link href="/">
        <Image src={Logo} width={107} alt="logo" />
      </Link>
      <Link href="/wikilist">위키목록</Link>
      <Link href="/boards">자유게시판</Link>
      <div className="right-container">
        {session ? (
          <>
            {/* <span>{JSON.stringify(session.user)}</span> */}
            <Image className="alarm" src={Alarm} width={32} alt="alarm" />
            <ProfileContainer onClick={handleProfileClick}>
              {profile ? (
                <img src={profile} className="profile" width="32px" height="32px" alt="profile" />
              ) : (
                <Image src={Profile} className="profile" width={32} height={32} alt="profile" />
              )}
              <Menu isOpen={isProfileMenuOpen} />
            </ProfileContainer>
          </>
        ) : (
          <span className="login-button" onClick={() => signIn()}>
            로그인
          </span>
        )}
      </div>
    </GNBContainer>
  );
}
