import color from '@/utils/color';
import typo from '@/utils/typo';
import styled from 'styled-components';

export const GNBContainer = styled.nav`
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

export const ProfileContainer = styled.div`
  position: relative;
  cursor: pointer;
`;
