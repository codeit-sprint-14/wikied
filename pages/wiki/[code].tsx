import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  Header,
  WikiSection,
  WikiSectionInner,
  Name,
  WikiLink,
  Sidebar,
  ImageWrap,
  UserInfoWrap,
  UserInfo,
  SlideButton,
} from '@/styles/wiki.style';

import WikiStepInit from '@/components/feature/wiki/WikiStepInit';
import WikiStepQuestion from '@/components/feature/wiki/WikiStepQuestion';
import WikiStepEditor from '@/components/feature/wiki/WikiStepEditor';
import WikiStepDone from '@/components/feature/wiki/WikiStepDone';
import InfoInputItem from '@/components/feature/wiki/InfoInputItem';
import SnackBar from '@/components/common/SnackBar';
import useScreenType from '@/hooks/useScreenType';

const DEFAULT_PROFILE_IMAGE = '/icons/ico-profile.svg';

export default function WikiPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { code } = router.query;

  const [name, setName] = useState<string>('');
  const [question, setQuestion] = useState<string | null>(null); // 질문
  const [inputAnswer, setInputAnswer] = useState(''); // 답변 인풋
  const [step, setStep] = useState<'init' | 'question' | 'editor' | 'done'>('init'); // 기본/질문/에디터/에디터작성후 상태 값
  const [loading, setLoading] = useState(true); // 로딩
  const [error, setError] = useState<string | null>(null); // 에러
  const [isError, setIsError] = useState(false); // 스낵바

  // 에디터 컨텐츠
  const [content, setContent] = useState('');
  const [draftContent, setDraftContent] = useState('');

  const [imageUrl, setImageUrl] = useState<string>(''); // 이미지
  const [draftImageUrl, setDraftImageUrl] = useState<string>(''); // 이미지

  const [questionModal, setQuestionModal] = useState(false);
  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarType, setSnackBarType] = useState<'success' | 'error'>('success');

  const [profileData, setProfileData] = useState({
    city: '',
    mbti: '',
    job: '',
    sns: '',
    birthday: '',
    nickname: '',
    bloodType: '',
    nationality: '',
    family: '',
  });
  const [draftProfileData, setDraftProfileData] = useState(profileData);

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

  const isEditableUser = session?.user?.profile?.code === code;
  const [isEditing, setIsEditing] = useState(false);

  const screenType = useScreenType();
  const screenTyes =
    screenType === 'smallDesktop' || screenType === 'tablet' || screenType === 'mobile';
  const [isOpen, setIsOpen] = useState(false);

  // 수정 여부 판단 get
  useEffect(() => {
    const checkEditingStatus = async () => {
      try {
        const res = await axios.get(`https://wikied-api.vercel.app/14-6/profiles/${code}/ping`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        const { registeredAt } = res.data;

        const now = new Date();
        const pingTime = new Date(registeredAt);
        const diffMs = now.getTime() - pingTime.getTime();

        if (diffMs < 5 * 60 * 1000) {
          setIsEditing(true);
          setIsSnackBarVisible(true);
          setSnackBarMessage('다른 사람이 편집 중입니다.');
          setSnackBarType('error');
        } else {
          setIsEditing(false);
        }
      } catch (err) {
        setIsEditing(false);
      }
    };

    if (code) {
      checkEditingStatus();
    }
  }, [code, session]);

  // GET
  useEffect(() => {
    if (!code) return;

    const fetchWikiData = async () => {
      try {
        const response = await axios.get(`https://wikied-api.vercel.app/14-6/profiles/${code}`);
        const data = response.data;

        let profile = {
          city: data.city || '',
          mbti: data.mbti || '',
          job: data.job || '',
          sns: data.sns || '',
          birthday: data.birthday || '',
          nickname: data.nickname || '',
          bloodType: data.bloodType || '',
          nationality: data.nationality || '',
          family: data.family || '',
        };

        setName(data.name);
        setProfileData(profile);
        setDraftProfileData(profile);

        setImageUrl(data.image || DEFAULT_PROFILE_IMAGE);
        setDraftImageUrl(data.image || DEFAULT_PROFILE_IMAGE);

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
    let updatedProfileData = {
      ...draftProfileData,
      // image: draftImageUrl,
      content: draftContent,
      ...(draftImageUrl !== DEFAULT_PROFILE_IMAGE && { image: draftImageUrl }),
    };

    try {
      await axios.patch(`https://wikied-api.vercel.app/14-6/profiles/${code}`, updatedProfileData, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      setProfileData(updatedProfileData);
      setDraftProfileData(updatedProfileData);
      setContent(draftContent);
      setImageUrl(draftImageUrl);
      setDraftImageUrl(draftImageUrl);

      setIsSnackBarVisible(true);
      setSnackBarMessage('저장되었습니다');
      setStep('done');

      console.log('patch', updatedProfileData);
    } catch (err) {
      setIsSnackBarVisible(true);
      setSnackBarMessage('저장에 실패했습니다');
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

      const uploadedImageUrl = response.data.url;

      setDraftImageUrl(uploadedImageUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  // 처음(init) 시작하기 버튼 모달
  const handleStart = () => {
    setQuestionModal(true);
  };

  // 에디터 취소
  const handleCancel = () => {
    if (!content || content.trim() === '') {
      setStep('init');
      setDraftContent(content);
      setDraftProfileData(profileData);
      setDraftImageUrl(imageUrl);
    } else {
      setDraftContent(content);
      setDraftProfileData(profileData);
      setDraftImageUrl(imageUrl);
      setStep('done');
    }
  };

  const handleCloseQuestionModal = () => {
    setQuestionModal(false);
  };

  // 정답 제출
  const handleVerifyAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.accessToken) {
      setSnackBarMessage('로그인이 필요합니다');
      setSnackBarType('error');
      setIsSnackBarVisible(true);
      return;
    }
    try {
      await axios.post(
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
      setDraftContent(content);
      setQuestionModal(false);
      // setInputAnswer('');
      setIsError(false);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }
  };

  // 수정 갱신
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        await axios.post(
          `https://wikied-api.vercel.app/14-6/profiles/${code}/ping`,
          { securityAnswer: inputAnswer },
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
      } catch (err) {
        console.error(err);
      }
    }, 270000); // 4분 30초마다 반복

    return () => clearInterval(intervalId);
  }, [code, inputAnswer, session?.accessToken]);

  // 에디터 수정
  const handleEditorChange = (value: string) => {
    setDraftContent(value);
  };

  // 우측 정보 input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDraftProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const handleCloseSnackBar = () => {
    setIsSnackBarVisible(false);
  };
  const handleCopyLink = () => {
    const link = `https://wikied-api.vercel.app/${code}`;

    // 링크 복사
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setSnackBarMessage('링크가 복사되었습니다.');
        setSnackBarType('success');
        setIsSnackBarVisible(true);
      })
      .catch(() => {
        setSnackBarMessage('링크 복사에 실패했습니다.');
        setSnackBarType('error');
        setIsSnackBarVisible(true);
      });
  };

  return (
    <WikiSection>
      <SnackBar
        isVisible={isSnackBarVisible}
        message={snackBarMessage}
        type={snackBarType}
        onClose={handleCloseSnackBar}
      />
      {(screenType === 'mobile' || screenType === 'tablet' || screenType === 'smallDesktop') && (
        <Header>
          <Name>{name}</Name>
          <WikiLink onClick={handleCopyLink}>https://wikied-api.vercel.app/{code}</WikiLink>
        </Header>
      )}
      <WikiSectionInner>
        {screenType === 'desktop' && (
          <Header>
            <Name>{name}</Name>
            <WikiLink onClick={handleCopyLink}>https://wikied-api.vercel.app/{code}</WikiLink>
          </Header>
        )}

        {step === 'init' && <WikiStepInit onStart={handleStart} />}
        <WikiStepQuestion
          isOpen={questionModal}
          onClose={handleCloseQuestionModal}
          question={question}
          inputAnswer={inputAnswer}
          onChange={setInputAnswer}
          setInputAnswer={setInputAnswer}
          onSubmit={handleVerifyAnswer}
          setIsError={setIsError}
          isError={isError}
        />
        {step === 'editor' && (
          <WikiStepEditor
            content={draftContent}
            onChange={handleEditorChange}
            onSave={handleSave}
            onCancel={handleCancel}
            showSaveCancelButtons={true}
          />
        )}
        {step === 'done' && (
          <WikiStepDone isEditing={isEditing} content={content} onStart={handleStart} />
        )}
      </WikiSectionInner>
      <Sidebar isOpen={isOpen}>
        <ImageWrap
          step={isEditableUser ? (step as 'editor') : 'done'}
          onClick={step === 'editor' ? handleImageClick : undefined}
        >
          <Image src={encodeURI(draftImageUrl)} width={200} height={200} alt="infoProfile" />
        </ImageWrap>
        <UserInfoWrap>
          <UserInfo isOpen={isOpen}>
            {fields.map(field => (
              <InfoInputItem
                key={field.name}
                title={field.title}
                name={field.name}
                value={draftProfileData[field.name]}
                step={isEditableUser ? step : 'done'}
                onChange={handleInputChange}
              />
            ))}
          </UserInfo>
        </UserInfoWrap>
        <SlideButton visible={screenTyes} onClick={() => setIsOpen(prev => !prev)}>
          {isOpen ? '▲' : '▼'}
        </SlideButton>
      </Sidebar>
    </WikiSection>
  );
}
