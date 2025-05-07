import { useEffect, useRef, useState } from 'react';
import Input from '../../common/Input';
import * as S from './style';

function SignInput({
  type,
  name,
  title,
  autoComplete,
  id,
  inputState,
  pw,
  value,
  ref,
  onChange,
  msg,
  required,
  ...rest
}: {
  type: string;
  name: string;
  title: string;
  autoComplete: string;
  id: string;
  ref?: React.RefObject<HTMLInputElement> | null;
  msg?: string;
  inputState: {
    msg: string;
    value: string;
    isActive: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  pw?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  const sibling = useRef(null);

  return (
    <S.Container inputState={inputState}>
      <label htmlFor={name} className={`sign-form__label ${inputState.isActive ? 'active' : ''}`}>
        {title}
      </label>
      <Input
        {...rest}
        {...inputState}
        className="sign-form__input"
        autoComplete={autoComplete}
        type={type === 'password' ? 'password' : type}
        name={name}
        id={id}
        pw={pw}
        ref={sibling.current}
        variant={inputState.msg || msg ? 'error' : 'default'}
      />
      {(inputState.msg || msg) && (
        <span className="sign-form__input__msg" id={`msg-${id}`}>
          {msg || inputState.msg}
        </span>
      )}
    </S.Container>
  );
}

export default SignInput;
