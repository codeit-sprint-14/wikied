import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Button from '@/components/common/Button';
import { ButtonWrap, QuillBox, QuillWrap } from '../../../styles/wiki.style';
import { quillIcons } from '@/public/icons/iconQuill';

let ReactQuill: any;

interface Props {
  content: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  showSaveCancelButtons?: boolean;
}

export default function WikiStepEditor({
  content,
  onChange,
  onSave,
  onCancel,
  showSaveCancelButtons,
}: Props) {
  const quillRef = useRef<any>(null);
  const { data: session } = useSession();
  const [isMounted, setIsMounted] = useState(false);

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
              // 'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${session?.accessToken}`,
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

  // ReactQuill 불러오기
  useEffect(() => {
    import('react-quill-new').then(module => {
      ReactQuill = module.default;
      setIsMounted(true);

      const Quill = module.Quill;
      const icons: Record<string, any> = Quill.import('ui/icons') as Record<string, string>;

      console.log(icons);
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
    });
  }, []);

  const editor = quillRef.current?.getEditor();
  if (editor) {
    const toolbar = editor.getModule('toolbar');
    toolbar.addHandler('image', imageHandler);
  }

  const toolbar = {
    container: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: '' }, { align: 'center' }, { align: 'right' }],
      ['image', 'video', 'link'],
    ],
  };

  useEffect(() => {
    const toolbar = document.querySelector('.ql-toolbar.ql-snow');

    if (!toolbar) return;

    let lastScrollLeft = toolbar.scrollLeft;

    const handleScroll = () => {
      const currentScrollLeft = toolbar.scrollLeft;

      if (Math.abs(currentScrollLeft - lastScrollLeft) >= 1) {
        const expandedPickers = toolbar.querySelectorAll('.ql-picker.ql-expanded');
        expandedPickers.forEach(picker => {
          picker.classList.remove('ql-expanded');
        });
      }

      lastScrollLeft = currentScrollLeft;
    };

    toolbar.addEventListener('scroll', handleScroll);

    return () => {
      toolbar.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ReactQuill이 준비될 때까지 렌더링x
  if (!isMounted || !ReactQuill) return <div>로딩 중...</div>;

  return (
    <QuillWrap>
      <QuillBox>
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={onChange}
          modules={{
            toolbar,
            keyboard: {
              bindings: {},
            },
          }}
          theme="snow"
        />
      </QuillBox>
      {showSaveCancelButtons && (
        <ButtonWrap>
          <Button onClick={onCancel} variant="outline">
            취소
          </Button>
          <Button onClick={onSave}>저장</Button>
        </ButtonWrap>
      )}
    </QuillWrap>
  );
}
