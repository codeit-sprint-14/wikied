import color from '@/utils/color';
import typo from '@/utils/typo';
import styled from 'styled-components';

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  /* margin-bottom: 200px; */

  button {
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;

    ${typo('18r')}
    color: ${color('gray400')};
    background: ${color('gray100')};

    border: none;
    border-radius: 10px;

    transition: all 0.05s ease-out;
    cursor: pointer;

    &:hover {
      background: ${color('gray200')};
    }

    &:disabled {
      background: ${color('gray100')};
    }

    &.number:disabled {
      color: ${color('green200')};
      filter: brightness(1);
    }
  }
`;
