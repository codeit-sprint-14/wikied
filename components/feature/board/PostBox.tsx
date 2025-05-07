import { ReactNode } from 'react';
import styled from 'styled-components';
import useScreenType from '@/hooks/useScreenType';
import Image from 'next/image';
import EditIcon from '@/public/icons/ico-edit.svg';
import DeleteIcon from '@/public/icons/ico-delete.svg';
import Button from '@/components/common/Button';

interface PostBoxProps {
  post: {
    title: string;
    writer: { id: number; name: string };
    createdAt: string;
    image: string;
    content: string;
  };
  onDelete?: () => void;
  onEdit?: () => void;
  likeButton?: ReactNode;
  likeCount?: number;
  isListView?: boolean;
  icons?: { element: React.ReactNode; onClick: (commnetId: number) => void }[];
}

export default function PostBox({
  post,
  icons,
  onEdit,
  onDelete,
  likeButton,
  likeCount,
  isListView = false,
}: PostBoxProps) {
  if (!post) return null;

  const { title, writer, createdAt, image, content } = post;
  const screenType = useScreenType();
  const today = new Date();
  const createdAtFormatted = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

  return (
    <Container>
      <Header>
        <h1>{title}</h1>
        <IconWrapper>
          {screenType === 'desktop' && icons && (
            <>
              {icons?.map((iconObj, index) => (
                <div
                  key={index}
                  onClick={() => iconObj.onClick(post.writer.id)}
                  style={{ position: 'relative' }}
                >
                  {iconObj.element}
                </div>
              ))}
            </>
          )}

          {screenType === 'tablet' && onEdit && onDelete && (
            <>
              <Button onClick={onEdit}>수정하기</Button>
              <Button onClick={onDelete}>삭제하기</Button>
            </>
          )}
          {screenType === 'mobile' && onEdit && onDelete && (
            <>
<<<<<<< HEAD
              <div onClick={onEdit}>
                <Image
                  src={EditIcon}
                  alt="수정"
                  width={18}
                  height={18}
                  onClick={onEdit}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div onClick={onDelete} style={{ cursor: 'pointer', marginRight: '-2px' }}>
                <Image
                  src={DeleteIcon}
                  alt="삭제"
                  width={18}
                  height={18}
                  onClick={onDelete}
                  style={{ cursor: 'pointer' }}
                />
              </div>
=======
              <Image
                src={EditIcon}
                alt="수정"
                width={18}
                height={18}
                onClick={onEdit}
                style={{ cursor: 'pointer' }}
              />
              <Image
                src={DeleteIcon}
                alt="삭제"
                width={18}
                height={18}
                onClick={onDelete}
                style={{ cursor: 'pointer' }}
              />
>>>>>>> 883218f (Revert "Merge pull request #35 from codeit-sprint-14/feature/조지현-board-Page")
            </>
          )}
        </IconWrapper>
      </Header>

      <Meta>
        <AuthorInfo>
          <span>{writer?.name}</span>
          <span>{createdAtFormatted}</span>
        </AuthorInfo>
        {likeButton && <LikeWrapper>{likeButton}</LikeWrapper>}
        {likeCount !== undefined && <LikeWrapper>{likeCount}</LikeWrapper>}
      </Meta>

      {isListView && image && <ImageStyled src={image} alt={title} />}
      <Content dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1064px;

  @media (max-width: 768px) {
    max-width: 624px;
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;

export const Header = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: flex-start;

  h1 {
    flex: 1;
    min-width: 0;
    max-width: 60%;
    color: ${({ theme }) => theme.color['gray500']};
    font-weight: 600;
    font-size: 32px;
    word-break: break-all;
    word-wrap: word;

    @media (max-width: 480px) {
      ${({ theme }) => theme.typo['24sb']};
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  cursor: pointer;
  margin-top: 16px;
  justify-content: flex-end;
  margin-left: auto;

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  border-bottom: 1px solid ${({ theme }) => theme.color['gray200']};
  padding-bottom: 8px;
  width: 100%;
`;

export const AuthorInfo = styled.div`
  display: flex;
  gap: 10px;
  flex: 1;
  color: ${({ theme }) => theme.color['gray400']};
  ${({ theme }) => theme.typo['14r']};
`;

export const ImageStyled = styled.img`
  max-width: 500px;
  width: 100%;
  margin: 24px 0;

  @media (max-width: 480px) {
    width: 90%;
  }
`;

export const Content = styled.div`
  line-height: 1.5;
  word-break: break-all;
  word-wrap: word;
  color: ${({ theme }) => theme.color['gray500']};
  ${({ theme }) => theme.typo['16r']};

  @media (max-width: 480px) {
    margin: 0 auto;
  }

  .ql-align-center {
    text-align: center;
  }

  .ql-align-right {
    text-align: center;
  }

  .ql-align-left {
    text-align: left;
  }

  ul,
  ol {
    list-style-position: inside;
    padding-left: 0;
    margin: 1em 0;
  }

  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 1em 0;
  }
  ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin: 1em 0;
  }

  li[data-list='bullet']::before {
    content: '•';
    margin-right: 8px;
    font-size: 1rem;
    line-height: 1;
  }

  li[data-list='bullet'] {
    list-style-type: none;
  }

  li {
    margin-bottom: 0.5em;
  }

  h1,
  h2,
  h3 {
    font-weight: bold;
    line-height: 1.4;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1rem 0;
  }
`;

export const LikeWrapper = styled.div`
  cursor: pointer;
  display: flex;
  gap: 6px;
  align-item: center;
  position: relative;
  top: 2px;
  color: ${({ theme }) => theme.color['gray500']};
  ${({ theme }) => theme.typo['14r']};

  svg,
  img {
    width: 22px;
    height: 22px;
  }
`;
