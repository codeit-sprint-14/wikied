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
import Delete from '@/public/icons/ico-close.svg';
import Hamburger from '@/public/icons/ico-menu.svg';
import axios from 'axios';
import getDate from '@/utils/getDate';

function NotificationMenu({ isOpen }: { isOpen: boolean }) {
  const { notification, fetchNotification } = useNotificationStore();
  const { data: session, status } = useSession();

  async function deleteNotification(id: number) {
    try {
      await axios.delete(`https://wikied-api.vercel.app/14-6/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      fetchNotification(session?.accessToken);
      notification.list = notification.list.filter(item => item.id !== id);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <S.NotificationMenu isOpen={isOpen}>
      <h2>알림 {notification.totalCount}개</h2>
      <ul>
        {notification.totalCount > 0 ? (
          notification.list.map(item => (
            <li key={item.id}>
              <span className="content">{item.content}</span>
              <span className="date">{getDate(item.createdAt)}</span>
              <button onClick={() => deleteNotification(item.id)}>
                <Image src={Delete} alt="delete" />
              </button>
            </li>
          ))
        ) : (
          <span>알림이 없습니다.</span>
        )}
      </ul>
    </S.NotificationMenu>
  );
}

export default function GNB() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userData, fetchUserData } = useUserStore();
  const { notification, fetchNotification } = useNotificationStore();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [winSize, setWinSize] = useState('desktop');

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1024) {
        setWinSize('desktop');
      } else if (window.innerWidth > 768) {
        setWinSize('tablet');
      } else {
        setWinSize('mobile');
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (router.asPath.includes('/wikilist')) {
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

  const handleNotificationClick = () => {
    setIsNotificationMenuOpen(prev => !prev);
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <S.GNBContainer>
      <Link href="/">
        <Image src={Logo} width={107} alt="logo" />
      </Link>

      {winSize !== 'mobile' && (
        <>
          <Link href="/wikilist">위키목록</Link>
          <Link href="/boards">자유게시판</Link>
        </>
      )}
      <div className="search-container">
        <div className={`search-bar ${showSearch ? 'show' : 'hide'}`}>
          <Image className="search-icon" src={Search} alt="search" />
          <Input
            placeholder="닉네임 검색"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                router.push(`/wikilist?search=${e.currentTarget.value}`);
              }
            }}
          />
        </div>
      </div>
      <div className="right-container">
        {winSize !== 'mobile' ? (
          session ? (
            <>
              <S.NotificationContainer onClick={handleNotificationClick}>
                <Image className="alarm" src={Alarm} width={32} alt="alarm" />
                <NotificationMenu isOpen={isNotificationMenuOpen} />
              </S.NotificationContainer>
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
          )
        ) : (
          <div className="mobile-container">
            <S.ProfileContainer onClick={handleMobileMenuClick}>
              <Image className="hamburger" src={Hamburger} width={32} alt="hamburger" />
              <Menu isOpen={isMobileMenuOpen} isMobile={true} session={session} />
            </S.ProfileContainer>
          </div>
        )}
      </div>
    </S.GNBContainer>
  );
}
