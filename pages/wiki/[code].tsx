import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

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
    if (!code) return;

    // 질문 가져오고
    const fetchWikiData = async () => {
      try {
        const res = await axios.get(`https://wikied-api.vercel.app/14-6/profiles/${code}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

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
  );
}
