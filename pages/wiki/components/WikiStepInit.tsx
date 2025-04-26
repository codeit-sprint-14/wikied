import Button from '@/components/common/Button';
import { WikiContent, WikiMessage } from '../style';

interface Props {
  onStart: () => void;
}

export default function WikiStepInit({ onStart }: Props) {
  return (
    <WikiContent>
      <WikiMessage>
        아직 작성된 내용이 없네요.
        <br />
        위키에 참여해 보세요!
      </WikiMessage>
      <Button onClick={onStart}>시작하기</Button>
    </WikiContent>
  );
}
