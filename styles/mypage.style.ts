import styled from 'styled-components';
import typo from '@/utils/typo';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    max-width: 480px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  h1 {
    ${typo('48sb')};
    margin-bottom: 48px;
  }
`;
