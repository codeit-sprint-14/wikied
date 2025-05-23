import { useEffect } from 'react';
import { styled, keyframes } from 'styled-components';
import checkIcon from '@/public/icons/ico-check.svg';
import errorIcon from '@/public/icons/ico-error.svg';
import Image from 'next/image';
import typo from '@/utils/typo';

interface SnackBarProps {
  isVisible: boolean;
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onClose: () => void;
}

export default function SnackBar({
  isVisible,
  message,
  type = 'success',
  duration = 3000,
  onClose,
}: SnackBarProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;
  const iconSrc = type === 'success' ? checkIcon : errorIcon;

  return (
    <SnackBarWrapper type={type}>
      <IconWrapper type={type}>
        <Image src={iconSrc} alt={type} width={18} height={18} />
      </IconWrapper>
      <div>{message}</div>
    </SnackBarWrapper>
  );
}

const typeColors = {
  success: {
    bg: 'green100',
    border: 'green200',
    color: 'green300',
  },

  error: {
    bg: 'red100',
    border: 'red200',
    color: 'red200',
  },
} as const;

const SlideUp = keyframes`
  0% {
    transform: translate(-50%, -150%);
    opacity: 0;
  }
  
  10% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }

  90% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  
  100%{
    transform: translate(-50%, -150%);
    opacity: 0;
  }
  `;

const SnackBarWrapper = styled.div<{ type: 'success' | 'error' }>`
  position: fixed;
  display: flex;
  align-items: center;
  top: 120px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
  gap: 10px;
  left: 50%;

  background-color: ${({ theme, type }) => theme.color[typeColors[type].bg]};
  color: ${({ theme, type }) => theme.color[typeColors[type].color]};
  border: 1px solid ${({ theme, type }) => theme.color[typeColors[type].border]};

  ${typo('14sb')};
  border-radius: 10px;
  padding: 15px 20px;

  animation: ${SlideUp} 3s cubic-bezier(0, 0.5, 0.5, 1);

  @media (max-width: 480px) {
    width: 90%;
    ${typo('12sb')};
  }
`;

const IconWrapper = styled.div<{ type: 'success' | 'error' }>`
  color: ${({ theme, type }) => theme.color[typeColors[type].bg]};
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
`;
