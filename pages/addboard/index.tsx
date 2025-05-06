import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import WikiStepEditor from '@/components/feature/wiki/WikiStepEditor';
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
  ThumbnailButton,
  ThumbnailPreview,
} from '@/styles/addboard.style';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export default function AddBoard() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const today = new Date();
  const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

  const handleSave = async () => {
    try {
      let imageUrl = null;

      if (thumbnailFile) {
        const formData = new FormData();
        formData.append('image', thumbnailFile);

        const uploadResponse = await axios.post(
          'https://wikied-api.vercel.app/14-6/images/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        imageUrl = uploadResponse.data?.url;
        console.log('업로드된 이미지 URL:', imageUrl);
      }

      const response = await axios.post(
        'https://wikied-api.vercel.app/14-6/articles',
        {
          title,
          content,
          ...(imageUrl ? { image: imageUrl } : {}),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      const result = response.data;
      console.log(result);
      router.push(`/board/${result.id}`);
    } catch (error) {
      console.error('업로드 또는 저장 중 오류:', error);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    } else {
      setThumbnailFile(null);
      setThumbnailPreview(null);
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
  const isDisabled = title.trim() === '' || plainText === '';

  return (
    <Container>
      <Inner>
        <Header>
          <div>
            <h2>게시물 등록하기</h2>
            <p>등록일 {formattedDate}</p>
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
          <ThumbnailButton>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleThumbnailChange}
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              썸네일 이미지 등록
            </Button>
            {thumbnailPreview && <ThumbnailPreview src={thumbnailPreview} alt="썸네일 미리보기" />}
          </ThumbnailButton>
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
