import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';
import SnackBar from '../wiki/components/SnackBar';

const QuillNoSSRWrapper = dynamic(() => import('react-quill-new'), {
  ssr: false,
});

const formats = ['bold', 'italic', 'underline', 'list', 'image', 'align', 'color'];

export default function AddBoard() {
  const quillRef = useRef(null);
  const { data: session } = useSession();
  const router = useRouter();
  //const { id } = router.query;
  const { id: queryId } = router.query;
  const id = queryId ?? '1568';

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const getContentLength = (htmlString: string) => {
    if (typeof window === 'undefined') {
      return { countWithSpace: 0, countWithoutSpace: 0 };
    }

    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlString;

    const imgCount = tempElement.querySelectorAll('img').length;
    const liCount = tempElement.querySelectorAll('li').length;
    const pureText = tempElement.textContent || tempElement.innerText || '';

    const pureTextLengthWithSpace = pureText.length;
    const pureTextLengthWithoutSpace = pureText.replace(/\s/g, '').length;

    const countWithoutSpace = pureTextLengthWithSpace + imgCount + liCount;
    const countWithSpace = pureTextLengthWithoutSpace + imgCount + liCount;
    return { countWithSpace, countWithoutSpace };
  };

  const date = new Date().toLocaleDateString('ko-KR').replaceAll('.', '.').replace('.', '.');
  const { countWithSpace, countWithoutSpace } = getContentLength(editorContent);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ align: '' }],
      [{ align: 'center' }],
      [{ align: 'right' }],
      [{ list: 'bullet' }],
      [{ list: 'ordered' }],
      [{ color: [] }],
      ['image'],
    ],
    handlers: {
      image: () => {
        fileInputRef.current?.click();
      },
    },
  };

  useEffect(() => {
    // if (!session) {
    //   router.push('/login');
    //   return;
    // }
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`https://wikied-api.vercel.app/14-6/articles/${id}`);
        const data = await res.json();
        setTitle(data.title || '');
        setImage(data.image || '');
        setEditorContent(
          (data.image
            ? `<p>
              <img src="${data.image}" alt="썸네일" />
            </p>`
            : '') + (data.content || '')
        );
      } catch (error) {
        console.error('게시물 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSave = async () => {
    if (!quillRef.current) return;

    const updatedHtml = quillRef.current?.editor?.root.innerHTML;

    try {
      const res = await fetch(`https://wikied-api.vercel.app/14-6/articles/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({ title, image, content: updatedHtml }),
      });

      if (!res.ok) {
        throw new Error('게시물 수정 실패');
      }

      setShowSnackBar(true);
    } catch (error) {
      console.error('게시물 수정 실패', error);
      alert('수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleEditorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`https://wikied-api.vercel.app/14-6/images`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('이미지 업로드 실패');
      }

      const data = await res.json();
      const editor = quillRef.current;
      if (editor) {
        const quillEditor = editor.getEditor();
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, 'image', data.url);
        quillEditor.setSelection(range.index + 1);

        //첫번째 이미지 자동으로 썸네일로 지정
        const editorHtml = quillEditor.root.innerHTML;
        const parser = new DOMParser();
        const doc = parser.parseFromString(editorHtml, 'text/html');
        const firstImg = doc.querySelector('img');
        if (firstImg) {
          setImage(firstImg.getAttribute('src') || '');
        }

        setEditorContent(editorHtml);
      }
    } catch (error) {
      console.error('이미지 업로드 에러: ', error);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  const handleSnackBarClose = () => {
    setShowSnackBar(false);
    router.push('/boards');
  };

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

      {/*숨겨진 파일 input*/}
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleEditorImageUpload}
        ref={fileInputRef}
      />

      <div>
        <QuillNoSSRWrapper
          theme="snow"
          value={editorContent}
          onChange={setEditorContent}
          modules={modules}
          formats={formats}
          ref={quillRef}
        />
      </div>

      <button onClick={handleSave}>수정하기</button>

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
