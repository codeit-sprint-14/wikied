import color from '@/utils/color';
import typo from '@/utils/typo';
import styled from 'styled-components';

export const GNBContainer = styled.nav`
  width: 100vw;
  display: flex;
  flex-direction: column;
  top: 0;
  position: fixed;
  z-index: 100;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  background: hsla(0, 0%, 100%, 0.9);
  backdrop-filter: blur(10px);

  height: 80px;
  transition: all 0.2s cubic-bezier(0, 0.5, 0.5, 1);

  .list-link {
    white-space: nowrap;
    position: relative;
    display: inline-block;

    &::before {
      transition: all 0.1s cubic-bezier(0, 0.5, 0.5, 1);
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% + 18px);
      height: 120%;
      background: ${color('gray500')};
      z-index: -1;
      border-radius: 8px;
      opacity: 0;
    }

    &:hover::before {
      opacity: 0.05;
    }
  }

  .divider {
    flex-grow: 1;
  }

  @media (max-width: 768px) {
    height: 60px;
    &.show {
      height: 120px;
    }
  }

  .upper-container {
    width: 100%;
    min-height: 80px;
    display: flex;
    padding: 20px 80px;
    align-items: center;
    justify-content: center;
    gap: 40px;

    @media (max-width: 768px) {
      min-height: 60px;
      padding: 10px 40px;

      .logo {
        width: 80px;
      }
    }
  }

  .lower-container {
    padding: 0 20px;
  }

  .search-container {
    flex-grow: 1;
    overflow: hidden;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 4px;

    @media (max-width: 768px) {
      align-items: flex-start;
      height: 60px;
    }
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

  .alarm-count {
    position: absolute;
    top: -6px;
    right: -4px;
    width: 20px;
    height: 20px;
    border: 2px solid ${color('gray50')};
    border-radius: 100px;
    background: ${color('red200')};
    color: ${color('gray50')};
    ${typo('12sb')};
    text-align: center;
    line-height: 16px;
    z-index: 10;
  }
`;

export const NotificationMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 38px;
  right: 0;
  width: 368px;
  background: ${color('gray50')};
  padding: 20px 28px;

  transition: all 0.1s cubic-bezier(0, 0.5, 0.5, 1);
  transform-origin: top;
  transform: ${props =>
    props.isOpen ? 'scaleY(1) translateY(0)' : 'scaleY(0.95) translateY(-6px)'};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
  backdrop-filter: blur(40px);

  border-radius: 10px;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);

  z-index: 10;

  @media (max-width: 480px) {
    position: fixed;
    width: 100vw;
    height: 70vh;
    left: 0;
    top: 30vh;

    transition: all 0.2s cubic-bezier(0, 0.5, 0.5, 1);
    opacity: 1;
    transform: ${props => (props.isOpen ? ' translateY(0)' : 'translateY(70vh)')};
  }

  h2 {
    ${typo('18sb')};
    color: ${color('gray500')};
    margin-bottom: 12px;
  }

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
