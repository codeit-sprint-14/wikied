import color from '@/utils/color';
import typo from '@/utils/typo';
import styled from 'styled-components';

const Sign = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('/images/img-background.svg');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;

  .form-container {
    position: absolute;
    bottom: 40px;
    right: 40px;
    width: calc(50vw - 80px);
    height: calc(100vh - 160px);
    min-height: 750px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    background: hsla(0, 0%, 100%, 0.8);
    backdrop-filter: blur(100px);
    border-radius: 20px;
    padding: 48px 260px;
    animation: slideUp 0.3s cubic-bezier(0, 0.5, 0.5, 1);
    @keyframes slideUp {
      from {
        transform: translateY(128px);
      }
      to {
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      width: 100vw;
      height: 80vh;
      padding: 48px 40px;
      border-radius: 20px 20px 0 0;
      min-height: 650px;

      bottom: 0px;
      left: 0px;
    }
  }

  .sign-container {
    width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 8px;

    @media (max-width: 480px) {
      width: 100%;
    }

    .logo {
      margin-bottom: auto;
      @media (max-width: 480px) {
        display: none;
      }
    }

    .signup-link {
      margin-top: auto;

      @media (min-width: 768px) {
        &::before {
          content: '';
          display: block;
          width: 100%;
          height: 70px;
        }
      }
    }

    .login-btn {
      margin: 16px 0;
    }

    .signup-link {
      ${typo('14r')};
      color: ${color('gray500')};

      &-bold {
        ${typo('14sb')};
        color: ${color('green300')};
      }
    }

    .error-msg {
      ${typo('14m')};
      color: ${color('red200')};
      margin-bottom: 8px;
      margin-top: -14px;
    }
  }

  h1 {
    ${typo('48sb')};
    font-weight: 700;
    line-height: 1;
    margin-bottom: 32px;
  }

  .divider-container {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    white-space: nowrap;
    ${typo('14m')};
    color: ${color('gray500')};
    margin: 8px 0;

    hr {
      width: 100%;
      height: 1px;
      background: ${color('gray300')};
      border: none;
    }
  }

  .social-container {
    display: flex;
    gap: 16px;

    .social-btn {
      background: none;
      border: none;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 48px;
      height: 48px;
      cursor: pointer;
    }
    #google {
      background-image: url('/icons/ico-google.svg');
    }
    #naver {
      background-image: url('/icons/ico-naver.svg');
    }
    #kakao {
      background-image: url('/icons/ico-kakao.svg');
    }
  }
`;

export default Sign;
