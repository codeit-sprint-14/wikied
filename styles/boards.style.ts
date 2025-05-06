import color from '@/utils/color';
import typo from '@/utils/typo';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  max-width: 1080px;
  margin: 160px auto;
  padding: 0 60px;
  box-sizing: content-box;

  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: 480px) {
    gap: 24px;
  }
`;

export const BestListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  h1 {
    ${typo('24sb')};
    color: ${color('gray500')};
  }
  h2 {
    ${typo('18sb')};
    color: ${color('gray500')};
  }
  ul {
    list-style: none;
    display: flex;
    gap: 16px;
    width: 100%;

    @media (max-width: 768px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    @media (max-width: 480px) {
      display: flex;
      gap: 16px;
      overflow-x: scroll;
      width: 100vw;
      margin: 0 -40px;
      height: 248px;
    }
  }
  .top-container {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
  .text-container {
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .bottom-container {
    display: flex;
    justify-content: space-between;
    ${typo('14m')};
    color: ${color('gray400')};

    .left-container {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .right-container {
      display: flex;
      gap: 4px;
      align-items: center;
    }
  }

  li {
    display: flex;
    width: 100%;
    height: 220px;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    background: ${color('gray50')};
    transition: all 0.1s ease-out;

    @media (max-width: 480px) {
      min-width: 248px;
      /* height: 180px; */
      &:first-child {
        margin-left: 40px;
      }
      &:last-child {
        margin-right: 40px;
      }
    }

    .thumbnail {
      width: 100%;
      height: 132px;
      object-fit: cover;
      transition: all 0.2s ease-out;
    }

    &:hover {
      filter: brightness(0.98);

      .thumbnail {
        transform: scale(1.05);
      }
    }
  }
`;

export const ListContainer = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .article-container {
    li {
      display: grid;
      grid-template-columns: 1fr 4fr 1.4fr 1fr;
      gap: 10px;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      height: 56px;
      border-bottom: 1px solid ${color('gray200')};
      padding: 0 56px;
      background: ${color('gray50')};
      transition: all 0.1s ease-out;

      @media (max-width: 768px) {
        padding: 0 20px;
        grid-template-columns: 1fr 2fr 1.4fr 1fr;
      }
      @media (max-width: 480px) {
        gap: 4px;
        height: 80px;
        padding: 0 12px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }

      .upper-container {
        display: flex;
        width: 100%;
      }
      .lower-container {
        display: flex;
        width: 100%;
        gap: 12px;
        color: ${color('gray400')};

        .like-count {
          margin-left: auto;
        }
      }

      &:hover {
        filter: brightness(0.98);
      }

      span {
        display: flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .top-container {
    display: flex;
    gap: 10px;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }

  .search-container {
    position: relative;
    width: 100%;
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
  .order-container {
    position: relative;
    width: 148px;
    height: 46px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    padding: 0 20px;
    transition: all 0.1s ease-out;
    ${typo('14m')};
    background: ${color('gray100')};
    color: ${color('gray500')};

    cursor: pointer;

    &:hover {
      filter: brightness(0.97);
    }

    @media (max-width: 480px) {
      width: 100%;
    }
  }

  .order-radio-container {
    display: flex;
    width: 100%;
    height: 46px;
    border-radius: 10px;

    label {
      flex-grow: 1;
      height: 100%;
      text-align: center;
      line-height: 46px;
      cursor: pointer;
      transition: all 0.1s ease-out;
      border-radius: 10px 0 0 10px;
      background: ${color('gray100')};

      &:last-child {
        border-radius: 0 10px 10px 0;
      }

      &:hover {
        filter: brightness(0.97);
      }
    }

    input {
      display: none;
    }
    input:checked + label {
      background: ${color('gray200')};
    }
  }
`;
