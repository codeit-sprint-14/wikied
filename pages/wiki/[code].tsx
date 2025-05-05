import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';

import axios from 'axios';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
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

import WikiStepInit from './components/WikiStepInit';
import WikiStepQuestion from './components/WikiStepQuestion';
import WikiStepEditor from './components/WikiStepEditor';
import WikiStepDone from './components/WikiStepDone';
import InfoInputItem from './components/InfoInputItem';
import SnackBar from './components/SnackBar';
import useScreenType from '@/hooks/useScreenType';

const DEFAULT_PROFILE_IMAGE = '/icons/ico-profile.svg';

export default function WikiPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { code } = router.query;

  const [question, setQuestion] = useState<string | null>(null); // 질문
  const [inputAnswer, setInputAnswer] = useState(''); // 답변 인풋
  const [step, setStep] = useState<'init' | 'question' | 'editor'>('init'); // 기본/질문/에디터 상태 값
  const [loading, setLoading] = useState(true); // 로딩
  const [error, setError] = useState<string | null>(null); // 에러


  useEffect(() => {

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

    // 질문 가져오고
    const fetchWikiData = async () => {
      try {

        const res = await axios.get(`https://wikied-api.vercel.app/14-6/profiles/${code}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        const response = await axios.get(`https://wikied-api.vercel.app/14-6/profiles/${code}`);
        const data = response.data;


        // 여기다가 저장
        setQuestion(res.data.securityQuestion);
      } catch (err) {
        console.error(err);
        setError('질문을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchWikiData();
  }, [code]);

  // 시작하기 전용 누르면 질문 보임
  const handleStart = () => {
    setStep('question');
  };


  // 답변 입력하고 ping 보냄
  const handleVerifyAnswer = async () => {

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
    } catch (err) {
      console.error(err);
      alert('답변이 틀렸습니다.');
    }
  };

  // 진행 중..
  const handleSave = () => {
    console.log('저장!');
  };

  const handleCancel = () => {
    setStep('init');
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (

    <>
      <h1>{session?.user?.name}</h1>
      <p>https://wikied-api.vercel.app/{code}</p>
=======
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


      {step === 'init' && <button onClick={handleStart}>시작하기</button>}

      {step === 'question' && (
        <div>
          <p>질문: {question}</p>
          <input
            type="text"
            value={inputAnswer}
            onChange={e => setInputAnswer(e.target.value)}
            placeholder="답변을 입력하세요"
          />
<<<<<<< HEAD
          <button onClick={handleVerifyAnswer}>제출하기</button>
        </div>
      )}

      {step === 'editor' && (
        <div>
          <div style={{ height: '500px' }}>
            <ReactQuill style={{ height: '400px' }} />
          </div>
          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            <button onClick={handleSave}>저장하기</button>
            <button onClick={handleCancel}>취소하기</button>
          </div>
        </div>
      )}
    </>

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
>>>>>>> 73cbf910e4cbee1a3c3771f70a4b2498df441905
  );
}
