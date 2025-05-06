import React from 'react';
import styled from 'styled-components';
import typo from '@/utils/typo';
import Link from 'next/link';
import Image from 'next/image';
import ErrorIcon from '@/public/icons/Layer_1.svg';
import color from '@/utils/color';
import PopCard from '../../components/feature/404/popcard';

const ErrorContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  position: relative;
  transform: translateY(-40px);

  @media (max-width: 768px) {
    transform: translateY(-60px);
    gap: 16px;
  }
`;

const ErrorMessage = styled.div`
  ${typo('18sb')};
  position: relative;
  margin-top: 184px;
  text-align: center;
  color: ${color('gray400')};

  @media (max-width: 768px) {
    font-size: 16px;
    margin-top: 120px;
  }
`;

const ErrorText = styled.p`
  margin: 0;
  font-size: 18px;
  & + & {
    margin-top: 1px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    & + & {
      margin-top: 2px;
    }
  }
`;

const ErrorImageWrapper = styled.div`
  width: 166.82px;
  height: 174.49px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(100% + 20px);

  @media (max-width: 768px) {
    width: 133px;
    height: 140px;
    bottom: calc(100% + 16px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default function Custom404() {
  return (
    <ErrorContainer>
      <ErrorMessage>
        <ErrorImageWrapper>
          <Image src={ErrorIcon} alt="404 Error" width={166.82} height={174.49} priority />
        </ErrorImageWrapper>
        <ErrorText>이 페이지는 들어본 적이 없네요...</ErrorText>
        <ErrorText>대신 요즘 인기있는 글은 어때요?</ErrorText>
      </ErrorMessage>
      <PopCard /> {/* PopCard 컴포넌트 추가 */}
      <Link href="/" passHref></Link>
    </ErrorContainer>
  );
}
