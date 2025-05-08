import styled, { keyframes } from 'styled-components';
import closeIcon from '@/public/icons/ico-close.svg';
import Image from 'next/image';
import color from '@/utils/color';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'large' | 'medium';
}

export default function Modal({ isOpen, onClose, size = 'large', children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose} $visible={isOpen}>
      <ModalWrapper $size={size || 'medium'} onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <Image src={closeIcon} alt="닫기" />
        </CloseButton>
        <ContentWrapper>
          <Content>{children}</Content>
        </ContentWrapper>
      </ModalWrapper>
    </Overlay>
  );
}

const SlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Overlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;

  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div<{ $size: 'large' | 'medium' }>`
  animation: ${SlideUp} 0.2s cubic-bezier(0, 0.5, 0.5, 1);
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${color('gray50')};
  border-radius: 10px;
  width: 100%;
  max-width: 395px;
  padding: 24px;
  height: ${({ $size }) => ($size === 'large' ? '435px' : '215px')};

  @media (max-width: 480px) {
    max-width: 90%;
    padding: 16px 12px;
    height: ${({ $size }) => ($size === 'large' ? '435px' : '211px')};
  }
`;

const CloseButton = styled.button`
  all: unset;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  background: ${color('gray50')};
  transition: all 0.1s cubic-bezier(0, 0.5, 0.5, 1);
  border-radius: 4px;

  img {
    width: 24px;
    height: 24px;
    border: none;
  }

  &:hover {
    background: ${color('gray200')};
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;

  margin-top: 30px;
  width: 100%;
  gap: 12px;
`;
