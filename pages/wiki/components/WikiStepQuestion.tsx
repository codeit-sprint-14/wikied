import Button from '@/components/common/Button';

interface Props {
  question: string | null;
  inputAnswer: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function WikiStepQuestion({ question, inputAnswer, onChange, onSubmit }: Props) {
  return (
    <div>
      <p>질문: {question}</p>
      <input
        type="text"
        value={inputAnswer}
        onChange={e => onChange(e.target.value)}
        placeholder="답변을 입력하세요"
      />
      <Button onClick={onSubmit}>제출하기</Button>
    </div>
  );
}
