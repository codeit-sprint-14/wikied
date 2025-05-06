import Button from '@/components/common/Button';
import { Viewer, ViewerButton, ViewerContainer } from '../../../styles/wiki.style';

interface Props {
  content: string;
  onStart: () => void;
  isEditing: boolean;
}

export default function WikiStepDone({ content, onStart, isEditing }: Props) {
  return (
    <ViewerContainer>
      <Viewer dangerouslySetInnerHTML={{ __html: content }} />
      <ViewerButton>
        {isEditing ? (
          <Button disabled>편집 중..</Button>
        ) : (
          <Button onClick={onStart}>위키 참여하기</Button>
        )}
      </ViewerButton>
    </ViewerContainer>
  );
}
