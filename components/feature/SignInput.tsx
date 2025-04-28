import { useRef, useState } from 'react';
import Input from '../common/Input';

function SignInput({
  type,
  name,
  title,
  autoComplete,
  id,
  inputState,
  pw,
  value,
  onChange,
  ...rest
}: {
  type: string;
  name: string;
  title: string;
  autoComplete: string;
  id: string;
  inputState: {
    msg: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  pw: string;
}) {
  const sibling = useRef(null);
  const [showPw, setShowPw] = useState(false);

  return (
    <>
      <label htmlFor={name} style={{ position: 'relative' }}>
        {title}
        <div className="input-container">
          <Input
            className="sign-form__input"
            autoComplete={autoComplete}
            type={type === 'password' ? (showPw ? 'text' : 'password') : type}
            name={name}
            id={id}
            pw={pw}
            value={value}
            onChange={onChange}
            ref={sibling}
            {...rest}
            {...inputState}
          />
          {/* {type === "password" && <ShowPassword setShowPw={setShowPw} />} */}
        </div>
      </label>
      {inputState.msg && (
        <span className="sign-form__input__msg" id={`msg-${id}`}>
          {inputState.msg}
        </span>
      )}
    </>
  );
}

export default SignInput;
