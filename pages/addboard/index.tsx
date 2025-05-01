import { useState } from 'react';
import { useRouter } from 'next/router';
import WikiStepEditor from '@/pages/wiki/components/WikiStepEditor';
import Button from '@/components/common/Button';
import {
  Container,
  Inner,
  Header,
  TitleArea,
  TitleInput,
  InfoRow,
  CountText,
  EditorArea,
  TopRightButton,
  BottomCenterButton,
} from './style';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function AddBoard() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  console.log(session);

  // post
  const handleSave = async () => {
    try {
      const response = await axios.post(
        'https://wikied-api.vercel.app/14-6/articles',
        { title, content },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      const result = response.data;
      if (result?.id) {
        router.push(`/boards/${result.id}`);
      }
    } catch (error) {
      console.error('에러:', error);
    }
  };

  const handleCancel = () => {
    router.push('/boards');
  };

  const plainText = content
    .replace(/<p><br><\/p>/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
  const isDisabled = title.trim() === '' && plainText === '';

  return (
    <Container>
      <Inner>
        <Header>
          <div>
            <h2>게시물 등록하기</h2>
            <p>등록일 2024.02.24.</p>
          </div>
          <TopRightButton>
            <Button onClick={handleSave} disabled={isDisabled}>
              등록하기
            </Button>
          </TopRightButton>
        </Header>
        <TitleArea>
          <InfoRow>
            <TitleInput
              maxLength={30}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
            />
            <CountText>
              {title.length}
              <span>/30</span>
            </CountText>
          </InfoRow>
        </TitleArea>

        <EditorArea>
          <p>
            공백포함 : 총 {plainText.length}자 | 공백제외 : 총 {plainText.replace(/\s/g, '').length}
            자
          </p>
          <WikiStepEditor
            content={content}
            onChange={setContent}
            onSave={handleSave}
            onCancel={handleCancel}
            showSaveCancelButtons={false}
          />
        </EditorArea>
        <BottomCenterButton>
          <Button onClick={() => router.push('/boards')} variant="outline">
            목록으로
          </Button>
        </BottomCenterButton>
      </Inner>
    </Container>
  );
}
