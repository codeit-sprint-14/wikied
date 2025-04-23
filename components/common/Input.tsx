import color from '@/utils/color';
import typo from '@/utils/typo';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  height?: string;
  variant?: 'default' | 'error';
}

interface ContainerProps {
  $width: string;
  $height: string;
  $variant: 'default' | 'error';
}

const Container = styled.input<ContainerProps>`
  width: ${props => props.$width};
  height: ${props => props.$height};

  ${typo('14m')};
  background: ${props => (props.$variant == 'default' ? color('gray100') : color('red100'))};
  color: ${color('gray500')};

  display: flex;
  padding: 14px 20px;
  border: none;
  overflow: hidden;
  border-radius: 10px;
  transition: filter 0.1s ease-out;

  &:hover {
    filter: brightness(0.97);
  }

  &::placeholder {
    color: ${color('gray400')};
  }

  &:focus {
    outline: 1px solid
      ${props => (props.$variant == 'default' ? color('green200') : color('red200'))};
  }
`;

export default function Input({
  className,
  width = '100%',
  height = '46px',
  variant = 'default',
  ...rest
}: InputProps) {
  return (
    <Container className={className} $variant={variant} $width={width} $height={height} {...rest} />
  );
}
