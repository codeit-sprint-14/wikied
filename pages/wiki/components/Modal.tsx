import styled, { keyframes } from 'styled-components';
import closeIcon from '@/public/icons/ico-close.svg';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'large' | 'medium';
}

export default function Modal({ isOpen, onClose, size = 'large', children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  return (
    <StyledDialog ref={dialogRef} onCancel={onClose} onClick={onClose} $visible={isOpen}>
      <ModalWrapper $size={size || 'medium'} onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <Image src={closeIcon} alt="닫기" />
        </CloseButton>
        <ContentWrapper>
          <Content>{children}</Content>
        </ContentWrapper>
      </ModalWrapper>
    </StyledDialog>
  );
}

const SlideUp = keyframes`
  0% {
  opacity: 0;
  }
  
  100%{
  opacity: 1;
  }
  `;

//콘텐츠 영역 스타일
export const Content = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;

  margin-top: 30px;
  width: 100%;
  gap: 12px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDialog = styled.dialog<{ $visible: boolean }>`
  border: none;
  padding: 0;
  background: none;
  width: 100%;
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 100;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const ModalWrapper = styled.div<{ $size: 'large' | 'medium' }>`
  animation: ${SlideUp} 0.8s ease-out;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color['gray50']};
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
  top: 16px;
  right: 16px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
    border: none;
  }
`;
