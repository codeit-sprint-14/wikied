import color from '@/utils/color';
import typo from '@/utils/typo';
import styled, { css } from 'styled-components';

const MenuContainer = styled.ul<{ isOpen: boolean }>`
  position: absolute;
  top: 38px;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 9999;

  width: 110px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);
  background: ${color('gray50')};

  transition: all 0.1s ease-out;
  transform: ${props =>
    props.isOpen ? 'scaleY(1) translateY(0)' : 'scaleY(0.95) translateY(-6px)'};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
  transform-origin: top;
`;

const MenuItemContainer = styled.li`
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.1s ease-out;
  border-bottom: 1px solid ${color('gray100')};

  &:last-child {
    border-bottom: none;
  }

  ${typo('14m')};
  color: ${color('gray500')};

  &:hover {
    background: ${color('gray100')};
  }

  &.danger {
    color: ${color('red200')};
  }
`;

function MenuItem({
  children,
  ...rest
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLLIElement>) {
  return <MenuItemContainer {...rest}>{children}</MenuItemContainer>;
}

export { MenuContainer, MenuItem };
