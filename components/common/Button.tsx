import color from '@/utils/color';
import typo from '@/utils/typo';
import styled, { css } from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  variant?: 'default' | 'outline';
  color?:
    | 'gray50'
    | 'gray100'
    | 'gray200'
    | 'gray300'
    | 'gray400'
    | 'gray500'
    | 'gray600'
    | 'green100'
    | 'green200'
    | 'green300'
    | 'red100'
    | 'red200'
    | 'purple100'
    | 'yellow100';
  children: React.ReactNode;
}

interface ContainerProps {
  $width: string;
  $height: string;
  $color: string;
  $variant: 'default' | 'outline';
  disabled?: boolean;
}

const Container = styled.button<ContainerProps>`
  width: ${props => props.$width};
  height: ${props => props.$height};

  ${typo('14sb')};

  background: ${props => color(props.$color)};
  color: ${color('gray50')};
  border: none;
  cursor: pointer;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-radius: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  ${props =>
    props.$variant == 'default' &&
    !props.disabled &&
    css`
      &:hover {
        filter: brightness(0.9);
      }
    `};

  ${props =>
    props.$variant == 'outline' &&
    css`
      background: none;
      color: ${props => color(props.$color)};
      border: 1px solid ${props => color(props.$color)};

      &:hover {
        background: ${props => color(props.$color)};
        color: ${color('gray50')};
      }
    `};

  ${props =>
    props.disabled &&
    css`
      background: ${color('gray300')};
      cursor: not-allowed;
    `};

  transition: all 0.1s ease-out;
`;

export default function Button({
  className,
  width = '120px',
  height = '40px',
  variant = 'default',
  disabled = false,
  type = 'button',
  color = 'green200',
  children,
  ...rest
}: ButtonProps) {
  return (
    <Container
      className={className}
      $variant={variant}
      $width={width}
      $height={height}
      $color={color}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </Container>
  );
}
