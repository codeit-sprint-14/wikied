import Button from '@/components/common/Button';
import { Viewer, ViewerButton, ViewerContainer } from '../style';

interface Props {
  content: string;
  onStart: () => void;
}

export default function WikiStepDone({ content, onStart }: Props) {
  return (
    <ViewerContainer>
      <Viewer dangerouslySetInnerHTML={{ __html: content }} />
      <ViewerButton>
        <Button onClick={onStart}>위키 참여하기</Button>
      </ViewerButton>
    </ViewerContainer>
  );
}
