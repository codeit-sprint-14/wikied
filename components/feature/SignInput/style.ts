import color from '@/utils/color';
import typo from '@/utils/typo';
import styled, { css } from 'styled-components';

export const Container = styled.div<{
  inputState: { msg: string; value: string; isActive: boolean };
}>`
  position: relative;
  width: 100%;
  /* height: 80px; */
  min-height: 60px;

  .sign-form__label {
    ${typo('16m')};
    color: ${color('gray400')};
    position: absolute;
    z-index: 1;
    transition: all 0.1s ease-out;
    transform-origin: left top;
    line-height: 54px;
    padding-left: 22px;
    transform: translate(0, 0) scale(1);

    ${props =>
      props.inputState.isActive
        ? css`
            transform: translate(0, -6px) scale(0.8);
          `
        : css`
            transform: translate(0, 0) scale(1);
          `}
  }

  .sign-form__input__msg {
    ${typo('14m')};
    color: ${color('red200')};
    /* position: absolute;
    bottom: 2px;
    left: 16px; */
  }

  .sign-form__input {
    /* position: absolute; */
    padding-top: 38px;
    padding-bottom: 16px;
    height: 48px;
    background: ${color('gray50')};
    border: ${props => (props.inputState.msg ? css`1px solid ${color('red200')}` : 'none')};
  }
`;
