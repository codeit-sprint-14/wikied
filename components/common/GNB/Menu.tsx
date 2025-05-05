import { MenuItem } from '../Menu';

import Link from 'next/link';
import { MenuContainer } from '../Menu';
import { useUserStore } from '@/stores/userStore';
import { signOut } from 'next-auth/react';
import color from '@/utils/color';

export default function Menu({
  isOpen,
  session,
  isMobile = false,
  handleNotification,
}: {
  isOpen: boolean;
  session: any;
  isMobile?: boolean;
  handleNotification?: () => void;
}) {
  const { userData } = useUserStore();

  return (
    <MenuContainer isOpen={isOpen}>
      {isMobile && (
        <>
          <MenuItem>
            <Link href="/wikilist">위키목록</Link>
          </MenuItem>
          <MenuItem>
            <Link href="/boards">자유게시판</Link>
          </MenuItem>
          <MenuItem onClick={handleNotification}>알림</MenuItem>
        </>
      )}
      <MenuItem>
        <Link href="/mypage">계정 설정</Link>
      </MenuItem>
      <MenuItem>
        {userData?.profile?.code ? (
          <Link href={`/wiki/${userData?.profile?.code}`}>내 위키</Link>
        ) : (
          <Link href="/mypage">내 위키 만들기</Link>
        )}
      </MenuItem>
      <MenuItem onClick={() => signOut()} className="danger">
        로그아웃
      </MenuItem>
    </MenuContainer>
  );
}
