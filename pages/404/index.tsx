import React from 'react';
import styled from 'styled-components';
import typo from '@/utils/typo';
import Link from 'next/link';
import Image from 'next/image';
import ErrorIcon from '@/public/icons/Layer_1.svg';
import color from '@/utils/color';
import PopCard from '@/components/feature/404/popcard';

const ErrorContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding-top: 80px;

  ${typo('18sb')};
  text-align: center;
  color: ${color('gray400')};

  @media (max-width: 768px) {
    ${typo('16sb')};
    padding-top: 0px;
    margin-top: -80px;
    gap: 16px;
  }
`;

const ErrorText = styled.p`
  ${typo('18m')};
  margin-bottom: 80px;

  @media (max-width: 768px) {
    ${typo('14m')};
    margin-bottom: 48px;
  }
`;

export default function Custom404() {
  return (
    <ErrorContainer>
      <Image src={ErrorIcon} alt="404 Error" width={166} />
      <ErrorText>
        이 페이지는 들어본 적이 없네요...
        <br />
        대신 요즘 인기있는 글은 어때요?
      </ErrorText>
      <PopCard />
    </ErrorContainer>
  );
}
