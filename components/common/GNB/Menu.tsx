import { MenuItem } from '../Menu';

import Link from 'next/link';
import { MenuContainer } from '../Menu';
import { useUserStore } from '@/stores/userStore';
import { signOut } from 'next-auth/react';
import color from '@/utils/color';

export default function Menu({ isOpen, session }: { isOpen: boolean; session: any }) {
  const { userData } = useUserStore();

  return (
    <MenuContainer isOpen={isOpen}>
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
