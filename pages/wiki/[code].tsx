import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Profile from '@/public/icons/ico-profile.svg';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  WikiSection,
  WikiSectionInner,
  Name,
  WikiLink,
  Sidebar,
  ImageWrap,
  UserInfoWrap,
  UserInfo,
} from './style';

import WikiStepInit from './components/WikiStepInit';
import WikiStepQuestion from './components/WikiStepQuestion';
import WikiStepEditor from './components/WikiStepEditor';
import WikiStepDone from './components/WikiStepDone';
import InfoInputItem from './components/InfoInputItem';

export default function WikiPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { code } = router.query;

  const [question, setQuestion] = useState<string | null>(null); // 질문
  const [inputAnswer, setInputAnswer] = useState(''); // 답변 인풋
  const [step, setStep] = useState<'init' | 'question' | 'editor' | 'done'>('init'); // 기본/질문/에디터/에디터작성후 상태 값
  const [loading, setLoading] = useState(true); // 로딩
  const [error, setError] = useState<string | null>(null); // 에러
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState<string>(''); // 이미지

  const [profileData, setProfileData] = useState({
    city: '',
    mbti: '',
    job: '',
    sns: '',
    birthday: '',
    nickname: '',
    bloodType: '',
    nationality: '',
    image: '',
    family: '',
  });

  const fields = [
    { title: '거주 도시', name: 'city' },
    { title: 'MBTI', name: 'mbti' },
    { title: '직업', name: 'job' },
    { title: 'SNS 계정', name: 'sns' },
    { title: '생일', name: 'birthday' },
    { title: '별명', name: 'nickname' },
    { title: '혈액형', name: 'bloodType' },
    { title: '국적', name: 'nationality' },
  ] as const;

  // GET
  useEffect(() => {
    if (!code || !session?.accessToken) return;

    const fetchWikiData = async () => {
      try {
        const response = await axios.get(`https://wikied-api.vercel.app/14-6/profiles/${code}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        const data = response.data;

        setProfileData({
          city: data.city || '',
          mbti: data.mbti || '',
          job: data.job || '',
          sns: data.sns || '',
          birthday: data.birthday || '',
          nickname: data.nickname || '',
          bloodType: data.bloodType || '',
          nationality: data.nationality || '',
          image: data.image || '',
          family: data.family || '',
        });
        setImageUrl(encodeURI(data.image));
        setContent(data.content);
        setQuestion(response.data.securityQuestion);

        if (data.content && data.content.trim() !== '') {
          setStep('done');
        } else {
          setStep('init');
        }
      } catch (err) {
        console.error(err);
        setError('질문을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchWikiData();
  }, [code, session]);

  // 저장 (PATCH)
  const handleSave = async () => {
    try {
      await axios.patch(
        `https://wikied-api.vercel.app/14-6/profiles/${code}`,
        {
          ...profileData,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      alert('저장');
      setStep('done');
    } catch (err) {
      console.error(err);
      alert('저장에 실패했습니다.');
      console.error('에러 응답:', err.response?.data || err.message);
    }
  };

  // 파일 선택 처리
  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

      console.log(file);

      if (file) {
        uploadImage(file);
      }
    };
    input.click();
  };

  // 이미지 업로드 함수
  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      console.log(formData);

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

      console.log('formData', formData);

      const uploadedImageUrl = response.data.url;
      setProfileData(prevData => ({
        ...prevData,
        image: uploadedImageUrl,
      }));
      setImageUrl(encodeURI(uploadedImageUrl));
      console.log('imageUrl:', imageUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };
  const handleStart = () => setStep('question'); // 질문
  const handleCancel = () => setStep('done'); // 취소

  // 제출하기
  const handleVerifyAnswer = async () => {
    try {
      const res = await axios.post(
        `https://wikied-api.vercel.app/14-6/profiles/${code}/ping`,
        { securityAnswer: inputAnswer },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      // 답 맞으면 리액트퀼 염
      setStep('editor');
      setInputAnswer('');
    } catch (err) {
      console.error(err);
      alert('답변이 틀렸습니다.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEditorChange = (value: string) => {
    setContent(value);
    setProfileData(prev => ({ ...prev }));
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <WikiSection>
      <WikiSectionInner>
        <Name>{session?.user?.name}</Name>
        <WikiLink>https://wikied-api.vercel.app/{code}</WikiLink>

        {step === 'init' && <WikiStepInit onStart={handleStart} />}
        {step === 'question' && (
          <WikiStepQuestion
            question={question}
            inputAnswer={inputAnswer}
            onChange={setInputAnswer}
            onSubmit={handleVerifyAnswer}
          />
        )}
        {step === 'editor' && (
          <WikiStepEditor
            content={content}
            onChange={handleEditorChange}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
        {step === 'done' && <WikiStepDone content={content} onStart={handleStart} />}
      </WikiSectionInner>
      <Sidebar>
        <ImageWrap
          step={step as 'editor'}
          onClick={step === 'editor' ? handleImageClick : undefined}
        >
          <Image src={imageUrl || Profile} width={200} height={200} alt="infoProfile" />
        </ImageWrap>
        <UserInfoWrap>
          <UserInfo>
            {fields.map(field => (
              <InfoInputItem
                key={field.name}
                title={field.title}
                name={field.name}
                value={profileData[field.name]}
                step={step}
                onChange={handleInputChange}
              />
            ))}
          </UserInfo>
        </UserInfoWrap>
      </Sidebar>
    </WikiSection>
  );
}
