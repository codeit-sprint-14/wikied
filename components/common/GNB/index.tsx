import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Logo from '@/public/icons/ico-logo.svg';
import Profile from '@/public/icons/ico-profile.svg';
import Alarm from '@/public/icons/ico-alarm.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Menu from './Menu';
import { useUserStore } from '@/stores/userStore';
import { useNotificationStore } from '@/stores/notificationStore';
import * as S from './style';
import Input from '../Input';
import { useRouter } from 'next/router';
import Search from '@/public/icons/ico-search.svg';

export default function GNB() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { userData, fetchUserData } = useUserStore();
  const { notification, fetchNotification } = useNotificationStore();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (router.asPath === '/wikilist') {
        setShowSearch(window.scrollY > 140);
      } else {
        setShowSearch(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [router.asPath]);

  useEffect(() => {
    if (session?.accessToken) {
      fetchUserData(session.accessToken);
      fetchNotification(session.accessToken);
      userData?.image && setProfile(userData.image);
      typeof userData?.profile === 'string' && setProfile(userData.profile);
    }
  }, [session, fetchUserData, fetchNotification]);

  const handleProfileClick = () => {
    setIsProfileMenuOpen(prev => !prev);
  };

  return (
    <S.GNBContainer>
      <Link href="/">
        <Image src={Logo} width={107} alt="logo" />
      </Link>
      <Link href="/wikilist">위키목록</Link>
      <Link href="/boards">자유게시판</Link>
      <div className="search-container">
        <div className={`search-bar ${showSearch ? 'show' : 'hide'}`}>
          <Image className="search-icon" src={Search} alt="search" />
          <Input
            placeholder="닉네임 검색"
            // onKeyPress={e => {
            //   if (e.key === 'Enter') {
            //     setSearch(e.target.value);
            //   }
            // }}
          />
        </div>
      </div>
      <div className="right-container">
        {session ? (
          <>
            <Image className="alarm" src={Alarm} width={32} alt="alarm" />
            <S.ProfileContainer onClick={handleProfileClick}>
              {profile ? (
                <img src={profile} className="profile" width="32px" height="32px" alt="profile" />
              ) : (
                <Image src={Profile} className="profile" width={32} height={32} alt="profile" />
              )}
              <Menu isOpen={isProfileMenuOpen} session={session} />
            </S.ProfileContainer>
          </>
        ) : (
          <span className="login-button" onClick={() => signIn()}>
            로그인
          </span>
        )}
      </div>
    </S.GNBContainer>
  );
}
