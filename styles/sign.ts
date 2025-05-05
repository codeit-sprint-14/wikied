import typo from '@/utils/typo';
import styled from 'styled-components';

const Sign = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .signContainer {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  h1 {
    ${typo('48sb')};
  }
`;

export default Sign;
