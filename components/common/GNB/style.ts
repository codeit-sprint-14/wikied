import color from '@/utils/color';
import typo from '@/utils/typo';
import styled from 'styled-components';

export const GNBContainer = styled.nav`
  position: fixed;
  display: flex;
  top: 0;
  width: 100vw;
  height: 80px;
  padding: 20px 80px;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  background: hsla(0, 0%, 100%, 0.9);
  backdrop-filter: blur(10px);
  align-items: center;
  justify-content: center;
  gap: 40px;
  z-index: 100;

  .search-container {
    flex-grow: 1;
    overflow: hidden;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
  }

  .search-bar {
    position: relative;
    transition: transform 0.2s cubic-bezier(0, 0.5, 0.5, 1);
    width: 100%;

    &.show {
      transform: translateY(0);
    }
    &.hide {
      transform: translateY(80px);
    }

    .search-icon {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
    }
    input {
      padding-left: 58px;
      background: hsla(232, 18.7%, 47.3%, 0.05);
    }
  }

  .profile {
    border-radius: 100px;
    border: 1px solid ${color('gray100')};
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

export const NotificationContainer = styled.div`
  position: relative;
`;

export const NotificationMenu = styled.div`
  position: absolute;
  top: 38px;
  right: 0;
  width: 368px;
  background: ${color('gray50')};

  transition: all 0.1s ease-out;
  transform: ${props =>
    props.isOpen ? 'scaleY(1) translateY(0)' : 'scaleY(0.95) translateY(-6px)'};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};

  border-radius: 10px;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    min-height: 64px;
    padding: 0 20px;
    border-bottom: 1px solid ${color('gray200')};
    transition: all 0.1s ease-out;

    .content {
      ${typo('16m')};
      color: ${color('gray500')};
    }
    .date {
      ${typo('12r')};
      color: ${color('gray400')};
    }

    &:last-child {
      border: none;
    }

    button {
      position: absolute;
      right: 12px;
      top: 8px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 2px;
      border-radius: 8px;

      &:hover {
        background: ${color('gray100')};
      }
    }
  }
`;
