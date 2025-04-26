import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Button from '@/components/common/Button';
import { ButtonWrap, QuillBox, QuillWrap } from '../style';

let ReactQuill: any; // 컴포넌트를 동적으로 불러올 변수

interface Props {
  content: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function WikiStepEditor({ content, onChange, onSave, onCancel }: Props) {
  const quillRef = useRef<any>(null);
  const { data: session } = useSession();

  const [isMounted, setIsMounted] = useState(false);

  // 클라이언트에서만 ReactQuill 불러오기
  useEffect(() => {
    import('react-quill-new').then(module => {
      ReactQuill = module.default; // ReactQuill 동적으로 임포트
      setIsMounted(true); // 마운트가 끝났으니 상태 업데이트
    });
  }, []);

  const imageHandler = async () => {
    if (!quillRef.current) return;

    const quillInstance: any = quillRef.current?.getEditor();

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
              Authorization: `Bearer ${session?.accessToken}`, // 세션 토큰 필요
            },
          }
        );
        const imageUrl = response.data.url;
        const range = quillInstance.getSelection(true);
        quillInstance.insertEmbed(range.index, 'image', encodeURI(imageUrl));
        quillInstance.setSelection(range.index + 1);
      } catch (error) {
        console.log(error);
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['bold', 'italic', 'underline', 'strike' /* , 'blockquote' */],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        [{ color: [] }, { background: [] }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  if (!isMounted || !ReactQuill) return null; // ReactQuill이 준비될 때까지 렌더링하지 않음

  return (
    <QuillWrap>
      <QuillBox>
        <ReactQuill ref={quillRef} value={content} onChange={onChange} modules={modules} />
      </QuillBox>
      <ButtonWrap>
        <Button onClick={onCancel} variant="outline">
          취소
        </Button>
        <Button onClick={onSave}>저장</Button>
      </ButtonWrap>
    </QuillWrap>
  );
}
