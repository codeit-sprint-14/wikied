import styled from 'styled-components';
import color from '@/utils/color';
import typo from '@/utils/typo';

export const Container = styled.div`
  max-width: 860px;
  margin: 164px auto 148px;
  padding: 0 60px;
  box-sizing: content-box;

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  .search-container {
    position: relative;
    width: 100%;
    margin-bottom: 16px;
    .search-icon {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
    }
    input {
      padding-left: 58px;
    }
  }

  .total-count {
    display: block;
    ${typo('16r')}
    color: ${color('gray400')};
    margin-bottom: 34px;
    margin-left: 12px;

    b {
      ${typo('16r')}
      color: ${color('green300')};
    }
  }
`;

export const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 80px;

  .no-result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    margin-top: 48px;
    ${typo('16r')};
    color: ${color('gray400')};

    b {
      ${typo('16sb')};
    }
  }

  li {
    display: flex;
    border-bottom: 1px solid ${color('gray200')};
    cursor: pointer;
    width: 100%;
    align-items: center;
    height: 142px;
    padding: 0 24px;
    transition: all 0.1s ease-out;
    gap: 32px;

    @media (max-width: 768px) {
      height: 128px;
      gap: 24px;
    }

    @media (max-width: 480px) {
      height: 96px;
      gap: 18px;
    }

    &:hover {
      background: hsla(232, 18.7%, 47.3%, 0.03);
    }

    .contents {
      display: flex;
      flex-direction: column;
      gap: 10px;
      color: ${color('gray400')};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (max-width: 768px) {
        gap: 6px;
      }

      @media (max-width: 480px) {
        gap: 0px;
      }
    }

    .contents-top {
      display: flex;
      align-items: center;
      gap: 8px;
      color: ${color('gray400')};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      h2 {
        ${typo('24sb')}
        color: ${color('gray500')};

        @media (max-width: 768px) {
          ${typo('20sb')};
        }
      }
    }

    .image-container {
      min-width: 94px;
      min-height: 94px;
      width: 94px;
      height: 94px;
      border-radius: 100px;
      overflow: hidden;

      @media (max-width: 768px) {
        min-width: 84px;
        width: 84px;
      }

      @media (max-width: 480px) {
        min-width: 60px;
        width: 60px;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;
