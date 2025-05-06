import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';
import SnackBar from '@/components/common/SnackBar';
import Button from '@/components/common/Button';
import { quillIcons } from '@/public/icons/iconQuill';
import Quill from 'quill';
import styled from 'styled-components';
import color from '@/utils/color';
import typo from '@/utils/typo';
const icons = Quill.import('ui/icons') as Record<string, any>;
icons.bold = quillIcons.bold;
icons.italic = quillIcons.italic;
icons.underline = quillIcons.underline;
icons.list.ordered = quillIcons.ordered;
icons.list.bullet = quillIcons.bullet;
icons.align[''] = quillIcons.left;
icons.align.center = quillIcons.center;
icons.align.right = quillIcons.right;
icons.image = quillIcons.image;
icons.link = quillIcons.link;
icons.video = quillIcons.video;

export default function Edit() {
  const quillRef = useRef<any>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const today = new Date();
  const date = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

  const imageHandler = async () => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post(
          `https://wikied-api.vercel.app/14-6/images/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );

        const imageUrl = response.data.url;
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, 'image', encodeURI(imageUrl));

        editor.setSelection(range.index + 1);

        const parsedDoc = new DOMParser().parseFromString(editor.root.innerHTML, 'text/html');
        const validImg = [...parsedDoc.querySelectorAll('img')].find(img => {
          const src = img.getAttribute('src') || '';
          return !src.startsWith('data:image');
        });
      } catch (error) {
        console.error(error);
      }
    };
  };

  const toolbar = {
    container: [
      ['bold', 'italic', 'underline'],
      [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: '' }, { align: 'center' }, { align: 'right' }],

      ['image', 'video', 'link'],
    ],
  };

  const formats = [
    'bold',
    'italic',
    'underline',
    'header',
    'list',
    'align',
    'image',
    'video',
    'link',
  ];

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`https://wikied-api.vercel.app/14-6/articles/${id}`);
        const data = await res.json();
        setTitle(data.title || '');
        //setImage(data.image || '');
        setEditorContent(data.content || '');
      } catch (error) {
        console.error('게시물 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSave = async () => {
    if (!title.trim() || !editorContent.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const temp = document.createElement('div');
    temp.innerHTML = editorContent;
    const firstImg = temp.querySelector('img');
    const thumbnail = firstImg?.getAttribute('src') || '';

    const payload: any = {
      title: title.trim(),
      content: editorContent,
    };

    const DEFAULT_THUMBNAIL_URL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/images/img-thumbnail.png'
        : 'https://wikied.vercel.app/images/img-thumbnail.png'; // 배포용

    if (thumbnail !== '') {
      payload.image = thumbnail;
    } else {
      payload.image = DEFAULT_THUMBNAIL_URL;
    }

    const res = await fetch(`https://wikied-api.vercel.app/14-6/articles/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.text();
    console.log('응답 상태:', res.status);
    console.log('응답 본문:', result);

    if (!res.ok) {
      alert('수정 실패');
      return;
    }

    setShowSnackBar(true);
    setTimeout(() => {
      router.push(`/board/${id}`);
    }, 3000);
  };

  const handleSnackBarClose = () => {
    setShowSnackBar(false);
    router.push(`/board/${id}`);
  };

  const getContentLength = (html: string) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;

    const liCount = tempElement.querySelectorAll('li').length;
    const text = tempElement.textContent || '';

    return {
      countWithSpace: text.length + liCount,
      countWithoutSpace: text.replace(/\s/g, '').length + liCount,
    };
  };

  const { countWithSpace, countWithoutSpace } = getContentLength(editorContent);
  const editor = quillRef.current?.getEditor();
  if (editor) {
    const toolbar = editor.getModule('toolbar');
    toolbar.addHandler('image', imageHandler);
  }

  if (loading) return <div>로딩 중...</div>;

  return (
    <Container>
      <Inner>
        <Header>
          <div>
            <h2>게시물 수정하기</h2>
            <p>등록일 {date}</p>
          </div>
          <TopRightButton>
            <Button onClick={handleSave}>수정하기</Button>
          </TopRightButton>
        </Header>
        <TitleArea>
          <InfoRow>
            <TitleInput
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={30}
              style={{ border: 'none' }}
            />
            <CountText>
              {title.length}
              <span>/30</span>
            </CountText>
          </InfoRow>
        </TitleArea>

        <EditorArea>
          <p>
            공백포함: 총 {countWithSpace}자 | 공백제외: 총 {countWithoutSpace}자
          </p>
          <ToolbarScrillWrapper>
            <EditorWrapper>
              <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={setEditorContent}
                modules={{
                  toolbar,
                  keyboard: {
                    bindings: {},
                  },
                }}
                formats={formats}
                ref={quillRef}
              />
            </EditorWrapper>
          </ToolbarScrillWrapper>
        </EditorArea>
      </Inner>

      {showSnackBar && (
        <SnackBar
          isVisible={showSnackBar}
          message="게시물이 성공적으로 수정되었습니다."
          type="success"
          onClose={handleSnackBarClose}
        />
      )}
    </Container>
  );
}

export const ToolbarScrillWrapper = styled.div`
  margin-top: 40px;

  .ql-toolbar.ql-snow {
    display: block;
    height: auto;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: visible;
    white-space: nowrap;
    background: ${color('gray100')};
    border-radius: 10px;
    padding: 10px;
    border: none;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
  }

  .ql-container.ql-snow {
    border: none;
  }

  .ql-editor {
    padding: 16px;
    min-height: 200px;
    white-space: pre-wrap;
  }
  .ql-toolbar .ql-formats .ql-active {
    background-color: ${color('gray200')};
    color: white;
    border-radius: 5px;
  }
  .ql-picker {
    overflow: visible;
    position: static;
    z-index: 10;
  }
  .ql-picker-options {
    background-color: #fff;
    border: 1px solid ${color('gray400')};
    position: absolute;
    top: 35px !important;
    left: 10px;
    margin-top: 4px;
    z-index: 1000;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    width: 170px;
    min-width: auto;
  }
  .ql-picker.ql-header {
    .ql-picker-label,
    .ql-picker-item {
      color: ${color('gray400')};
      font-weight: 500;
    }

    .ql-picker-item:hover {
      color: ${color('gray500')};
    }
  }
`;
export const EditorWrapper = styled.div`
  height: 500px;
  position: relative;

  .quill {
    height: calc(100% - 43px);
  }
`;

const Container = styled.div`
  max-width: 1060px;
  margin: 0 auto;
  padding-top: 80px;
  height: 100vh;
  overflow: visible;

  @media (max-width: 768px) {
    padding: 60px 16px;
    margin-top: 50px !important;
  }

  @media (max-width: 480px) {
    padding: 40px 12px;
    margin-top: 50px !important;
  }
`;

const Inner = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 50px 0;
  overflow: visible;

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    padding: 16px;
    gap: 16px;
    box-shadow: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  h2 {
    color: ${color('gray500')};
    ${typo('24sb')}

    @media (max-width: 480px) {
      font-size: 16px;
    }
  }

  p {
    margin-top: 10px;
    color: ${color('gray400')};
    ${typo('16r')}

    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
`;

const TopRightButton = styled.div`
  button {
    @media (max-width: 480px) {
      width: 72px !important;
      height: 40px !important;
    }
  }
`;

const TitleArea = styled.div``;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  border-top: 1px solid ${color('gray200')};
  border-bottom: 1px solid ${color('gray200')};
`;
const TitleInput = styled.input`
  flex: 1;
  padding: 12px 0;
  font-size: 16px;
  border: none;
  outline: none;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const CountText = styled.span`
  color: ${color('gray500')};
  ${typo('14m')}
  span {
    color: ${color('green300')};
  }
`;
const EditorArea = styled.div`
  overflow: visible;
  .quill {
  }
  p {
    margin-top: 20px;
    color: ${color('gray600')};
    ${typo('16m')}

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;
