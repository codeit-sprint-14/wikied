import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useSession } from 'next-auth/react';
import PostBox from './components/PostBox';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EditIcon from '@/public/icons/ico-edit.svg';
import DeleteIcon from '@/public/icons/ico-delete.svg';
import CommentInput from './components/CommentInput';
import Button from '@/components/common/Button';
import { MenuContainer, MenuItem } from '@/components/common/Menu';
import styled from 'styled-components';
import SelectIcon from '@/public/icons/ico-select.svg';
import Image from 'next/image';
import { useUserStore } from '@/stores/userStore';
import CommentItem from './components/CommentItem';
import HeartIcon from '@/public/icons/ico-heart.svg';
import NoCommentImage from '@/public/icons/img-character.png';
import SnackBar from '../wiki/components/SnackBar';

export async function getStaticPaths() {
  const response = await fetch(`https://wikied-api.vercel.app/14-6/articles`);
  const data = await response.json();
  const posts = data.list;

  const paths = posts.map((post: any) => ({ params: { id: String(post.id) } }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { id } = context.params!;
  const response = await fetch(`https://wikied-api.vercel.app/14-6/articles/${id}`);
  const post = await response.json();

  return {
    props: {
      post,
    },
  };
};

export default function Board({
  post: initialPost,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: session } = useSession();
  const { fetchUserData } = useUserStore();
  const userId = session?.user?.id;
  const router = useRouter();
  const { id, edited } = router.query; //최신글 반영

  const [post, setPost] = useState(initialPost); //최신글 반영영

  const [comments, setComments] = useState([]); //댓글 리스트 저장
  const [inputComment, setInputComment] = useState(''); //댓글 저장

  const [openedDropdownId, setOpenedDropdownId] = useState<number | null>(null); //드롭다운

  const [editingCommnetId, setEditingCommentId] = useState<number | null>(null); //댓글 수정
  const [editedContent, setEditedContent] = useState<string>(''); //댓글 수정

  const [isLiked, setIsLiked] = useState<boolean>(post?.isLiked ?? false); //좋아요
  const [isLikeCount, setIsLikeCount] = useState<number>(post?.likeCount ?? 0); //좋아요

  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarType, setSnackBarType] = useState<'success' | 'error'>('success');

  const [isTablet, setIsTablet] = useState(false);

  //최신글 반영영
  useEffect(() => {
    if (edited === 'true') {
      const fetchUpdatedPost = async () => {
        const res = await fetch(`https://wikied-api.vercel.app/14-6/articles/${id}`);
        const data = await res.json();
        setPost(data);
        setIsLiked(data.isLiked ?? false);
        setIsLikeCount(data.likeCount ?? 0);
      };
      fetchUpdatedPost();
    }
  }, [edited, id]);

  //로그인 후 userData 패치
  useEffect(() => {
    console.log('session:', session);
    if (session?.accessToken) {
      fetchUserData(session.accessToken);
    }
  }, [session]);

  //댓글 조회
  useEffect(() => {
    const fetchComments = async () => {
      if (!post.id) return;

      const response = await fetch(
        `https://wikied-api.vercel.app/14-6/articles/${post.id}/comments?limit=100`
      );
      const data = await response.json();
      console.log('댓글 응답 데이터:', data);
      setComments(data.list);
    };

    fetchComments();
  }, [post?.id]);

  //반응형
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 481 && width <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //댓글 등록
  const handleCommentSubmit = async () => {
    console.log('버튼 실행됨');
    if (!session?.accessToken) {
      showSnackBar('로그인 후 이용해주세요.', 'error');
      return;
    }

    if (!inputComment) {
      showSnackBar('댓글을 입력해주세요.', 'error');
      return;
    }

    console.log('inputComment:', inputComment);
    console.log('userData.code:', session.accessToken);

    const res = await fetch(`https://wikied-api.vercel.app/14-6/articles/${post.id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({ content: inputComment }),
    });

    console.log('fetch 요청 보냄');

    if (!res.ok) {
      const error = await res.json();
      console.error('댓글 등록 실패:', error);
      return;
    }

    setInputComment(''); //입력창 비우기

    const response = await fetch(
      `https://wikied-api.vercel.app/14-6/articles/${post.id}/comments?limit=100`
    );
    const data = await response.json();
    setComments(data.list);
  };

  //댓글 아이콘 클릭
  const handleIconClick = (commentId: number) => {
    if (!session?.accessToken) {
      showSnackBar('로그인 후 이용해주세요.', 'error');
      return;
    }
    setOpenedDropdownId(prev => (prev === commentId ? null : commentId));
  };

  //댓글 수정
  const handleEditClick = (commentId: number) => {
    if (!session) {
      console.log('로그인 후 이용해주세요');
      return;
    }
    setEditingCommentId(commentId);
    const comment = comments.find(c => c.id === commentId);
    setEditedContent(comment?.content || '');
    setOpenedDropdownId(null); //드롭다운 닫기
  };

  const handleEditSubmit = async (commentId: number) => {
    if (!session?.accessToken) return;

    const res = await fetch(`https://wikied-api.vercel.app/14-6/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({ content: editedContent }),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('댓글 수정 실패: ', error);
      return;
    }

    //수정 성공 후 댓글 목록 다시 불러오기
    const response = await fetch(
      `https://wikied-api.vercel.app/14-6/articles/${post.id}/comments?limit=100`
    );
    const data = await response.json();
    setComments(data.list);
    setEditingCommentId(null);
  };

  //댓글 삭제
  const handleDeleteClick = async (commentId: number) => {
    if (!session?.accessToken) {
      console.log('로그인 후 이용해주세요');
      return;
    }

    try {
      const res = await fetch(`https://wikied-api.vercel.app/14-6/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        console.error('댓글 삭제 실패: ', error);
        return;
      }

      //삭제 후 새로고침
      const response = await fetch(
        `https://wikied-api.vercel.app/14-6/articles/${post.id}/comments?limit=100`
      );
      const data = await response.json();
      setComments(data.list);

      setOpenedDropdownId(null); //드롭다운 닫기
    } catch (error) {
      console.error('댓글 삭제 중 에러 발생: ', error);
    }
  };

  //게시물 수정
  const handlePostEditClick = () => {
    if (!post.id) return;
    router.push(`/addboard/${post.id}`);
  };

  //게시물 삭제
  const handlePostDeleteClick = async () => {
    try {
      const res = await fetch(`https://wikied-api.vercel.app/14-6/articles/${post.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        console.error('게시물 삭제 실패: ', error);
        return;
      }

      //삭제 후 새로고침
      const response = await fetch(`https://wikied-api.vercel.app/14-6/articles/${post.id}`);
      const data = await response.json();
      setComments(data.list);

      setOpenedDropdownId(null); //드롭다운 닫기
    } catch (error) {
      console.error('게시물 삭제 중 에러 발생: ', error);
    }
  };

  //좋아요 클릭
  const handleLikeClick = async () => {
    if (!session?.accessToken) {
      showSnackBar('로그인 후 이용해주세요.', 'error');
      return;
    }

    try {
      if (!isLiked) {
        const res = await fetch(`https://wikied-api.vercel.app/14-6/articles/${post.id}/like`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (!res.ok) {
          const error = await res.json();
          console.error('좋아요 실패', error);
          return;
        }

        setIsLiked(false);
        setIsLikeCount(prev => prev - 1);
      } else {
        const res = await fetch(`https://wikied-api.vercel.app/14-6/articles/${post.id}/like`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        if (!res.ok) {
          const error = await res.json();
          console.error('좋아요 추가 실패:', error);
          return;
        }
        setIsLiked(true);
        setIsLikeCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('좋아요 처리 중 에러 발생: ', error);
    }
  };

  const showSnackBar = (message: string, type: 'success' | 'error' = 'success') => {
    setSnackBarMessage(message);
    setSnackBarType(type);
    setIsSnackBarVisible(true);
  };

  if (!post) return '문제가 발생했습니다. 다시 시도하세요.';

  return (
    <Wrapper>
      <UnderBar>
        <Button onClick={() => router.push('/board')}>목록으로</Button>
      </UnderBar>

      <PostBox
        post={post}
        icons={
          post.writer.id === userId && [
            {
              element: <Image src={SelectIcon} alt="드롭다운" width={20} height={20} />,
              onClick: () => setOpenedDropdownId(post.id),
            },
          ]
        }
        likeButton={
          <HeartWrapper onClick={handleLikeClick}>
            <Image
              src={HeartIcon}
              alt="좋아요"
              width={18}
              height={18}
              className={isLiked ? 'liked' : ''}
            />
            <span>{isLikeCount}</span>
          </HeartWrapper>
        }
      />
      {post.writer.id === userId && (
        <MenuContainer
          isOpen={openedDropdownId === post.id}
          onMouseLeave={() => setOpenedDropdownId(null)}
        >
          <MenuItem onClick={handlePostEditClick}>수정하기</MenuItem>
          <MenuItem onClick={handlePostDeleteClick}>삭제하기</MenuItem>
        </MenuContainer>
      )}

      {comments.length === 0 ? (
        <NoCommentWrapper>
          <Image src={NoCommentImage} alt="댓글 없음" width={100} height={100} />
          <NoCommentText>댓글이 없습니다.</NoCommentText>
        </NoCommentWrapper>
      ) : (
        comments.map(comment => (
          <div key={comment.id}>
            {editingCommnetId === comment.id ? (
              <CommentInput
                comment={editedContent}
                onChange={e => setEditedContent(e.target.value)}
                charCount={editedContent.length}
                maxLength={500}
              >
                <Button onClick={() => handleEditSubmit(comment.id)}>수정 완료</Button>
              </CommentInput>
            ) : (
              <>
                <CommentItem
                  comment={comment}
                  icons={[
                    {
                      element: <Image src={SelectIcon} alt="드롭다운" width={18} height={18} />,
                      onClick: id => handleIconClick(id),
                    },
                  ]}
                />

                <MenuContainer
                  isOpen={openedDropdownId === comment.id}
                  onMouseLeave={() => setOpenedDropdownId(null)}
                >
                  <MenuItem onClick={() => handleEditClick(comment.id)}>수정하기</MenuItem>
                  <MenuItem onClick={() => handleDeleteClick(comment.id)}>삭제하기</MenuItem>
                </MenuContainer>
              </>
            )}
          </div>
        ))
      )}

      <div>댓글 {comments.length}</div>
      <CommentInput
        comment={inputComment}
        onChange={e => setInputComment(e.target.value)}
        placeholder="댓글을 입력하세요"
        charCount={inputComment.length}
        maxLength={500}
      >
        <ButtonWrapper>
          <Button onClick={handleCommentSubmit}>댓글 등록</Button>
        </ButtonWrapper>
      </CommentInput>

      <SnackBar
        isVisible={isSnackBarVisible}
        message={snackBarMessage}
        type={snackBarType}
        onClose={() => setIsSnackBarVisible(false)}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // 중앙 정렬
  padding: 120px;
  width: 100%;
`;

const ContentBox = styled.div`
  width: 100%;
  max-width: 768px; // 적당한 최대 폭
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const UnderBar = styled.div`
  width: 100%;
  max-width: 768px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 16px;
`;

const HeartWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const NoCommentWrapper = styled.div``;

const NoCommentText = styled.div``;
