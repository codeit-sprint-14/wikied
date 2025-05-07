import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';

import { useNotificationStore } from '@/stores/notificationStore';
import { useUserStore } from '@/stores/userStore';
import useScreenType from '@/hooks/useScreenType';
import getDate from '@/utils/getDate';
import * as S from './style';
import Input from '../Input';
import Menu from './Menu';
import Logo from '@/public/icons/ico-logo.svg';
import Profile from '@/public/icons/ico-profile.svg';
import Alarm from '@/public/icons/ico-alarm.svg';
import Search from '@/public/icons/ico-search.svg';
import Delete from '@/public/icons/ico-close.svg';
import Hamburger from '@/public/icons/ico-menu.svg';

function NotificationMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { notification, fetchNotification } = useNotificationStore();
  const { data: session, status } = useSession();
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  async function deleteNotification(id: number) {
    try {
      await axios.delete(`https://wikied-api.vercel.app/14-6/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      fetchNotification(session?.accessToken || '');
      notification.list = notification.list.filter(item => item.id !== id);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <S.NotificationMenu isOpen={isOpen} ref={sheetRef}>
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
  const screenType = useScreenType();

  useEffect(() => {
    console.log('userdata : ', JSON.stringify(userData));
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
    console.log(JSON.stringify(userData));
    const checkTokenAndFetch = async () => {
      try {
        if (!session?.accessToken) return;

        const decoded = jwtDecode(session.accessToken);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp < now) {
          console.warn('accessToken expired. Logging out!');
          await signOut({ callbackUrl: '/login' });
          return;
        }

        await fetchUserData(session.accessToken);
        await fetchNotification(session.accessToken);

        if (userData?.image) setProfile(userData.image);
        if (typeof userData?.profile === 'string') setProfile(userData.profile);
      } catch (error) {
        console.error('Token check or fetch failed:', error);
        await signOut({ callbackUrl: '/login' });
      }
    };

    checkTokenAndFetch();
  }, [session, fetchUserData, fetchNotification]);

  const handleNotificationClose = () => {
    setIsNotificationMenuOpen(false);
  };

  return (
    <S.GNBContainer className={showSearch ? 'show' : 'hide'}>
      <div className="upper-container">
        <Link href="/">
          <Image src={Logo} width={107} alt="logo" />
        </Link>
        {screenType !== 'mobile' && (
          <>
            <Link href="/wikilist" className="list-link">
              위키목록
            </Link>
            <Link href="/boards" className="list-link">
              자유게시판
            </Link>
          </>
        )}
        {screenType === 'desktop' ? (
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
        ) : (
          <div className="divider" />
        )}
        <div className="right-container">
          {screenType !== 'mobile' ? (
            session ? (
              <>
                <S.NotificationContainer onClick={() => setIsNotificationMenuOpen(prev => !prev)}>
                  <Image className="alarm" src={Alarm} width={32} alt="alarm" />
                  <NotificationMenu
                    isOpen={isNotificationMenuOpen}
                    onClose={handleNotificationClose}
                  />
                </S.NotificationContainer>
                <S.ProfileContainer onClick={() => setIsProfileMenuOpen(prev => !prev)}>
                  {profile ? (
                    <img
                      src={profile}
                      className="profile"
                      width="32px"
                      height="32px"
                      alt="profile"
                    />
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
              <NotificationMenu isOpen={isNotificationMenuOpen} onClose={handleNotificationClose} />
              <S.ProfileContainer onClick={() => setIsMobileMenuOpen(prev => !prev)}>
                <Image className="hamburger" src={Hamburger} width={32} alt="hamburger" />
                <Menu
                  isOpen={isMobileMenuOpen}
                  isMobile={true}
                  session={session}
                  handleNotification={() => setIsNotificationMenuOpen(prev => !prev)}
                />
              </S.ProfileContainer>
            </div>
          )}
        </div>
      </div>
      <div className="lower-container">
        {screenType !== 'desktop' && (
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
        )}
      </div>
    </S.GNBContainer>
  );
}
