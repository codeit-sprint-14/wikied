import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useSession } from 'next-auth/react';
import PostBox from './components/PostBox';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommentInput from './components/CommentInput';
import Button from '@/components/common/Button';
import { MenuContainer, MenuItem } from '@/components/common/Menu';
import SelectIcon from '@/public/icons/ico-select.svg';
import Image from 'next/image';
import { useUserStore } from '@/stores/userStore';
import CommentItem from './components/CommentItem';
import HeartIcon from '@/public/icons/ico-heart.svg';
import NoCommentImage from '@/public/images/img-nocomment.png';
import SnackBar from '../wiki/components/SnackBar';
import * as S from '@/styles/board.style';
import useScreenType from '@/hooks/useScreenType';
import HeartIconFilled from '@/public/icons/ico-heartfilled.svg';

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

export type Post = {
  id: number;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  isLiked: boolean;
  likeCount: number;
  writer: {
    id: number;
    name: string;
  };
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  writer: {
    id: number;
    name: string;
    profileImage: string;
  };
};

export default function Board({
  post: initialPost,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: session } = useSession();
  const { fetchUserData } = useUserStore();
  const userId = session?.user?.id;

  const router = useRouter();
  const screenType = useScreenType();
  const { id, edited } = router.query; //최신글 반영

  const [post, setPost] = useState<Post>(initialPost); //최신글 반영영

  const [comments, setComments] = useState<Comment[]>([]); //댓글 리스트 저장
  const [inputComment, setInputComment] = useState(''); //댓글 저장

  const [openedDropdownId, setOpenedDropdownId] = useState<number | null>(null); //드롭다운

  const [editingCommnetId, setEditingCommentId] = useState<number | null>(null); //댓글 수정
  const [editedContent, setEditedContent] = useState<string>(''); //댓글 수정

  const [isLiked, setIsLiked] = useState<boolean>(post?.isLiked ?? false); //좋아요
  const [isLikeCount, setIsLikeCount] = useState<number>(post?.likeCount ?? 0); //좋아요

  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarType, setSnackBarType] = useState<'success' | 'error'>('success');

  //최신글 반영
  useEffect(() => {
    const fetchUpdatedPost = async () => {
      const res = await fetch(`https://wikied-api.vercel.app/14-6/articles/${id}`, {
        headers: session?.accessToken
          ? { Authorization: `Bearer ${session.accessToken}` }
          : undefined,
      });
      const data = await res.json();
      setPost(data);
      setIsLiked(data.isLiked ?? false);
      setIsLikeCount(data.likeCount ?? 0);
    };

    if (id) fetchUpdatedPost();
  }, [id, session]);

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
      showSnackBar('댓글이 삭제되었습니다.', 'success');

      setOpenedDropdownId(null); //드롭다운 닫기
    } catch (error) {
      console.error('댓글 삭제 중 에러 발생: ', error);
    }
  };

  //게시물 수정
  const handlePostEditClick = () => {
    if (!post.id) return;
    router.push(`/board/edit?id=${post.id}`);
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

      router.push('/boards');

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
      if (isLiked) {
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

  const isAuthor = session?.user?.id === post?.writer?.id;
  if (!post) return '문제가 발생했습니다. 다시 시도하세요.';

  return (
    <S.Wrapper>
      <S.ContentBox>
        <PostBox
          post={post}
          isListView={false}
          icons={
            screenType === 'desktop' && isAuthor
              ? [
                  {
                    element: (
                      <div>
                        <Image src={SelectIcon} alt="드롭다운" width={18} height={18} />

                        <MenuContainer
                          isOpen={openedDropdownId === post.id}
                          onMouseLeave={() => setOpenedDropdownId(null)}
                          style={{ top: '27px' }}
                        >
                          <MenuItem onClick={handlePostEditClick}>수정하기</MenuItem>
                          <MenuItem onClick={handlePostDeleteClick}>삭제하기</MenuItem>
                        </MenuContainer>
                      </div>
                    ),
                    onClick: () => handleIconClick(post.id),
                  },
                ]
              : undefined
          }
          onEdit={isAuthor ? handlePostEditClick : undefined}
          onDelete={isAuthor ? handlePostDeleteClick : undefined}
          likeButton={
            <S.HeartWrapper onClick={handleLikeClick}>
              <Image
                src={isLiked ? HeartIconFilled : HeartIcon}
                alt="좋아요"
                width={10}
                height={10}
                className={isLiked ? 'liked' : ''}
              />
              <span>{isLikeCount}</span>
            </S.HeartWrapper>
          }
        />
        <S.UnderBar>
          <Button variant="outline" onClick={() => router.push('/boards')}>
            목록으로
          </Button>
        </S.UnderBar>

        <S.CommentCount>
          댓글 <S.CommentLength>{comments.length}</S.CommentLength>
        </S.CommentCount>
        <CommentInput
          comment={inputComment}
          onChange={e => setInputComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          charCount={inputComment.length}
          maxLength={500}
        >
          <Button onClick={handleCommentSubmit}>댓글 등록</Button>
        </CommentInput>

        {comments.length === 0 ? (
          <S.NoCommentWrapper>
            <Image src={NoCommentImage} alt="댓글 없음" width={226} height={146} />
            <S.NoCommentText>첫 번째로 댓글을 달아보세요!</S.NoCommentText>
          </S.NoCommentWrapper>
        ) : (
          comments.map(comment => (
            <div key={comment.id} style={{ position: 'relative' }}>
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
                    style={{ top: '42px', left: '677px' }}
                  >
                    <MenuItem onClick={() => handleEditClick(comment.id)}>수정하기</MenuItem>
                    <MenuItem onClick={() => handleDeleteClick(comment.id)}>삭제하기</MenuItem>
                  </MenuContainer>
                </>
              )}
            </div>
          ))
        )}
      </S.ContentBox>

      <SnackBar
        isVisible={isSnackBarVisible}
        message={snackBarMessage}
        type={snackBarType}
        onClose={() => setIsSnackBarVisible(false)}
      />
    </S.Wrapper>
  );
}
