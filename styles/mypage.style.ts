import styled from 'styled-components';
import typo from '@/utils/typo';

export const Container = styled.div`
  max-width: 540px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 480px) {
    width: 100vw;
    padding: 0 12px;
  }

  .btn {
    min-width: 400px;
    width: 100%;

    @media (max-width: 480px) {
      min-width: 100%;

      h2 {
        ${typo('16sb')};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
      }

      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        ${typo('12sb')};
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  h1 {
    ${typo('48sb')};
    margin-bottom: 48px;

    @media (max-width: 480px) {
      ${typo('24sb')};
    }
  }
`;
