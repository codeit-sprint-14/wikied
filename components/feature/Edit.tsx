import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';
import SnackBar from '@/components/common/SnackBar';
import Button from '@/components/common/Button';

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

  const date = new Date().toLocaleDateString('ko-KR').replaceAll('.', '.').replace('.', '.');

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
        //if (validImg) setImage(validImg.getAttribute('src') || '');

        //setEditorContent(editor.root.innerHTML);
      } catch (error) {
        console.error(error);
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'],
        [{ align: '' }],
        [{ align: 'center' }],
        [{ align: 'right' }],
        [{ list: 'ordered' }, { list: 'bullet' }],

        [{ color: [] }],
        ['image'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  const formats = ['bold', 'italic', 'underline', 'list', 'align', 'image', 'color'];

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

    // if (image && image.trim() !== '') {
    //   payload.image = image;
    // }

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
  };

  const handleSnackBarClose = () => {
    setShowSnackBar(false);
    router.push(`/board/${id}`);
  };

  const getContentLength = (html: string) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;

    const imgCount = tempElement.querySelectorAll('img').length;
    const liCount = tempElement.querySelectorAll('li').length;
    const text = tempElement.textContent || '';

    return {
      countWithSpace: text.length + imgCount + liCount,
      countWithoutSpace: text.replace(/\s/g, '').length + imgCount + liCount,
    };
  };

  const { countWithSpace, countWithoutSpace } = getContentLength(editorContent);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div style={{ paddingTop: '100px' }}>
      <div>
        <h1>게시물 수정하기</h1>
        <p> 등록일 {date}</p>
      </div>

      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ border: 'none' }}
      />
      <div>
        공백포함: 총 {countWithSpace}자 | 공백제외: 총 {countWithoutSpace}자
      </div>

      <div>
        <ReactQuill
          theme="snow"
          value={editorContent}
          onChange={setEditorContent}
          modules={modules}
          formats={formats}
          ref={quillRef}
        />
      </div>

      <Button onClick={handleSave}>수정하기</Button>

      {showSnackBar && (
        <SnackBar
          isVisible={showSnackBar}
          message="게시물이 성공적으로 수정되었습니다."
          type="success"
          onClose={handleSnackBarClose}
        />
      )}
    </div>
  );
}
