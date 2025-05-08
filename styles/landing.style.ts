import color from '@/utils/color';
import typo from '@/utils/typo';
import styled from 'styled-components';

export const Container = styled.div`
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  width: 100vw;
  height: calc(100vh - 80px);
  background: ${color('gray200')};
  margin-top: 80px;
  position: relative;

  .contents {
    position: absolute;
    white-space: nowrap;
    z-index: 10;
    //히어로
    &#section-01 {
      top: 48px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 35%;

      gap: 12px;

      @media (max-width: 768px) {
        width: 70%;
      }
      @media (max-width: 480px) {
        width: 80%;
      }

      img {
        object-fit: cover;
        height: 100%;
      }
    }

    //위키 정리하기
    &#section-02 {
      top: 96px;
      left: 96px;

      @media (max-width: 768px) {
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      @media (max-width: 480px) {
        top: 30%;
      }
    }

    //친구 확인 질문
    &#section-03 {
      top: 96px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;

      @media (max-width: 480px) {
        top: 30%;
      }
    }

    //링크 공유
    &#section-04 {
      bottom: 128px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;

      @media (max-width: 768px) {
        bottom: 30%;
      }
    }

    //위키드 사용중
    &#section-05 {
      top: 45%;
      left: 96px;
      transform: translateY(-50%);

      @media (max-width: 768px) {
        top: auto;
        bottom: 20vh;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    //CTA
    &#section-06 {
      top: 128px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .graphic {
    position: absolute;

    &#graphic-02 {
      bottom: 0;
      right: 2%;
      width: 45%;

      @media (max-width: 768px) {
        width: 90%;
        left: 52%;
        transform: translateX(-50%);
      }
    }
    &#graphic-03 {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60vh;

      @media (max-width: 768px) {
        width: 100%;
      }

      img {
        width: 100%;
        aspect-ratio: 746/642;
        position: absolute;
        bottom: 0;
        object-fit: contain;
        object-position: bottom;
      }
    }

    &#graphic-04 {
      top: 20%;
      left: 50%;
      transform: translateX(-50%);

      @media (max-width: 768px) {
        width: 90%;
      }
    }

    /* 리뷰 */
    &#graphic-05 {
      top: 0;
      right: 42px;
      display: flex;
      justify-content: flex-end;
      gap: 40px;
      width: 900px;

      @media (max-width: 768px) {
        /* left: 0; */
        width: 100%;
        top: 14vh;
        gap: 20px;
        flex-direction: column;
        align-items: flex-start;
      }
    }
    &#graphic-06 {
      bottom: 0;
      left: 0;
      width: 100%;

      img {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        object-fit: cover;
        object-position: center;
        opacity: 0.9;
      }
    }
    .reviews {
      display: flex;
      flex-direction: column;
      gap: 20px;

      @media (max-width: 768px) {
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
      }
    }

    .review {
      width: 20vw;
      height: 8vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 12px;

      background: ${color('gray600')};
      color: ${color('gray100')};

      border-radius: 24px;
      padding: 0 38px;

      @media (max-width: 768px) {
        width: 50vw;
        height: 20vw;
        gap: 8px;
      }

      @media (max-width: 480px) {
        gap: 2px;
      }

      span {
        ${typo('18sb')};
        white-space: nowrap;

        @media (max-width: 480px) {
          ${typo('14sb')};
        }
      }

      p {
        ${typo('14m')};
        display: -webkit-box;
        /* height: 100px; */
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;

        @media (max-width: 480px) {
          ${typo('12r')};
        }
      }

      &.go-up {
        animation: upAnimation 10s linear infinite;
        @keyframes upAnimation {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(calc(-900% - 0px));
          }
        }
        @media (max-width: 768px) {
          @keyframes upAnimation {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-800% - 160px));
            }
          }
        }
      }

      &.go-down {
        animation: downAnimation 10s linear infinite;
        @keyframes downAnimation {
          0% {
            transform: translateY(calc(-900% - 0px));
          }
          100% {
            transform: translateY(0);
          }
        }
        @media (max-width: 768px) {
          @keyframes downAnimation {
            0% {
              transform: translateX(calc(-800% - 160px));
            }
            100% {
              transform: translateX(0);
            }
          }
        }
      }
    }
  }

  h2 {
    font-size: 4vw;
    font-weight: 600;
    line-height: 130%;
    color: ${color('gray400')};

    @media (max-width: 768px) {
      font-size: 48px;
      text-align: center;
    }

    @media (max-width: 480px) {
      font-size: 32px;
      text-align: center;
    }

    b {
      font-weight: 800;
      color: ${color('gray500')};

      &.green {
        color: ${color('green300')};
      }
    }
  }

  h4 {
    color: ${color('gray400')};
    ${typo('24sb')};
    margin: 12px 0;

    @media (max-width: 768px) {
      text-align: center;
      ${typo('16sb')};
    }
    @media (max-width: 480px) {
      ${typo('14sb')};
    }
  }

  section {
    scroll-snap-align: start;
    width: 100%;
    height: 92%;
    padding: 40px 40px 0 40px;

    &:last-child {
      height: 100%;
      padding: 40px;
    }

    @media (max-width: 768px) {
      padding: 0;
    }

    .section-container {
      width: 100%;
      height: 100%;
      background: ${color('gray50')};
      border-radius: 40px;
      position: relative;
      overflow: hidden;

      @media (max-width: 768px) {
        border-radius: 0;
      }
    }
  }
`;

export const CTA = styled.button`
  width: 156px;
  height: 52px;
  border-radius: 100px;
  border: 2px solid ${color('green300')};
  justify-content: center;
  align-items: center;
  background: hsla(0, 0%, 100%, 0.7);
  backdrop-filter: blur(20px);
  color: ${color('green300')};
  ${typo('16sb')};
  transition: all 0.1s ease-out;
  cursor: pointer;
  z-index: 10;
  /* position: absolute; */
  bottom: 0;

  &:hover {
    background: ${color('green300')};
    color: ${color('gray50')};
  }
`;
