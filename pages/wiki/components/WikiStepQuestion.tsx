import Button from '@/components/common/Button';
import lock from '@/public/icons/ico-lock.svg';
import styled from 'styled-components';
import Modal from './Modal';
import Image from 'next/image';
import color from '@/utils/color';
import typo from '@/utils/typo';

interface Props {
  isOpen: boolean;
  question: string | null;
  inputAnswer: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  setIsError: (value: boolean) => void;
  setInputAnswer: (value: string) => void;
  isError: boolean;
}

export default function WikiStepQuestion({
  isOpen,
  question,
  inputAnswer,
  onChange,
  onSubmit,
  onClose,
  isError,
  setIsError,
  setInputAnswer,
}: Props) {
  const handleClose = () => {
    setIsError(false); // 모달 닫을 때 isError를 false로 설정
    onClose(); // 기존 onClose 호출
    setInputAnswer('');
  };
  const effectiveIsError = isOpen ? isError : false;
  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="large">
      <Explain>
        <Image src={lock} alt="lock" />
        다음 퀴즈를 맞추고
        <br />
        위키를 작성하세요
      </Explain>
      <Question>{question}</Question>
      <form onSubmit={onSubmit}>
        <InputWrap>
          <AnswerInput
            type="text"
            value={inputAnswer}
            onChange={e => onChange(e.target.value)}
            placeholder="답안을 입력해 주세요"
            isError={effectiveIsError}
          />
          {effectiveIsError && <ErrorMessage>정답이 아닙니다.</ErrorMessage>}
        </InputWrap>

        <Button type="submit" style={{ width: '100%' }}>
          확인
        </Button>
      </form>
      <BottonText>
        위키드는 지인들과 함께하는 즐거운 공간입니다. <br />
        지인에게 상처를 주지 않도록 작성해 주세요.
      </BottonText>
    </Modal>
  );
}
const Explain = styled.p`
  text-align: center;
  color: ${color('gray400')};
  ${typo('14r')};
  img {
    margin: 0 auto;
    margin-bottom: 12px;
  }
`;
const Question = styled.p`
  margin-top: 36px;
  color: ${color('gray500')};
  ${typo('18sb')};
`;
const InputWrap = styled.div`
  margin-bottom: 28px;
`;

const AnswerInput = styled.input<{ isError: boolean }>`
  width: 100%;
  padding: 10px 20px;
  ${typo('14r')};
  background-color: ${color('gray100')};
  border-radius: 10px;
  outline: none;
  border: 1px solid ${({ isError }) => (isError ? color('red200') : 'transparent')}; // 에러가 있으면 빨간색 테두리

  &:focus {
    outline: 1px solid ${({ isError }) => (isError ? 'transparent' : color('green200'))}; // 에러가 있으면 빨간색 포커스
  }
`;
const ErrorMessage = styled.p`
  margin-top: 8px;
  color: ${color('red200')};
  ${typo('12r')};
`;

const BottonText = styled.div`
  color: ${color('gray400')};
  ${typo('12r')};
  text-align: center;
`;
