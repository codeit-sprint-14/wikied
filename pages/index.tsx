import Section_01 from './home/Section_01';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import router from 'next/router';

import HeroTitle from '@/public/images/img-hero-title.svg';
import Qna from '@/public/images/img-qna.svg';
import CtaBackground from '@/public/images/img-background-cta.svg';
import Image from 'next/image';
import LottieWiki from '@/public/lotties/lottie-wiki.json';
import LottieShare from '@/public/lotties/lottie-share.json';
import * as S from '@/styles/landing.style';

import dynamic from 'next/dynamic';
import useScreenType from '@/hooks/useScreenType';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

function SectionContainer({ lines, sleep = 1, ...rest }: { lines: string[]; sleep?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} {...rest}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: sleep + i * 0.2,
            ease: [0, 0.5, 0.5, 1],
            type: 'tween',
            duration: 0.7,
          }}
          dangerouslySetInnerHTML={{ __html: line }}
        />
      ))}
    </div>
  );
}
function Graphic({
  children,
  sleep = 0.5,
  posY = '300px',
  initialOpacity = 0,
  lottieRef,
  ...rest
}: {
  children: React.ReactNode;
  sleep?: number;
  posY?: string;
  initialOpacity?: number;
  lottieRef?: React.RefObject<any>;
  [key: string]: any;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && lottieRef?.current) {
      lottieRef.current.play();
    }
  }, [isInView]);

  return (
    <div ref={ref} {...rest}>
      <motion.div
        initial={{ opacity: initialOpacity, y: posY }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: sleep, ease: [0, 0.7, 0.3, 1], type: 'tween', duration: 0.6 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Reviews({ isGoUp }: { isGoUp: boolean }) {
  const contents = [
    '동아리 애들끼리 위키 만들어서 놀고 있는데, 무슨 작은 커뮤니티 하나 차린 기분임',
    '친구들이 썰 푸는 맛에 하루 한번은 꼭 들어온다. 진짜 이거 중독됨',
    '수업 중에 친구 위키 보다가 터졌음. 교수님 죄송해요… 너무 재밌어요…',
    '친구 위키 하나 둘 보다가, 어느새 내 것도 만들고 있었음. 은근히 빠져든다.',
    'TMI 정리한다는 게 이렇게 재밌을 줄 몰랐다. 의외로 성취감도 있다',
    '우리 반 애 위키 봤는데, 맨날 무뚝뚝한 애가 은근 귀엽게 적어놔서 놀람ㅋㅋ',
    '자기소개서 쓰기 전에 위키 정리했는데, 진짜 내 이야기 정돈되는 느낌임',
    '친구들이랑 추억 회상 겸 위키 만들었는데, 기분이 따뜻하네요',
  ];
  return (
    <div className="reviews">
      {contents.map((content, i) => (
        <div key={i} className={`review ${isGoUp ? 'go-up' : 'go-down'}`}>
          <span>{`${String(i + 53326).toLocaleString()}번째 리뷰 `}</span>
          <p>{content}</p>
        </div>
      ))}
      {contents.map((content, i) => (
        <div key={i} className={`review ${isGoUp ? 'go-up' : 'go-down'}`}>
          <span>{`${String(i + 53326).toLocaleString()}번째 리뷰 `}</span>
          <p>{content}</p>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const screenType = useScreenType();
  const contents =
    screenType === 'mobile'
      ? [
          [
            `<h2><b>우리 꽤 친한데,</b></h2>`,
            `<h2><b>서로 얼마나 알고 있나요?</b></h2>`,
            `<h4>위키드에서 한 페이지에 정리해보아요!</h4>`,
          ],
          [`<h2><b>친구 확인 질문</b></h2>`, `<h4>내 친구만 글을 쓸 수 있어요</h4>`],
          [`<h2><b>링크 공유</b></h2>`, `<h4>내 위키를 친구에게 손쉽게 공유해요</h4>`],
          [
            `<h2><b>1,223,848명</b>의</h2>`,
            `<h2>친구들이</h2>`,
            `<h2><b class="green">위키드</b>를 이용하고 있어요</h2>`,
          ],
          [
            `<h2>이제 <b>친구의 TMI를<br/></b>정리</b>해줄 시간.</h2><br/>`,
            `<h2><b>준비</b>되셨나요?<br/><br/></h2>`,
          ],
        ]
      : [
          [
            `<h2><b>우리 꽤 친한데,</b></h2>`,
            `<h2><b>서로 얼마나 알고 있나요?</b></h2>`,
            `<h4>위키드에서 한 페이지에 정리해보아요!</h4>`,
          ],
          [`<h2><b>친구 확인 질문</b></h2>`, `<h4>내 친구만 글을 쓸 수 있어요</h4>`],
          [`<h2><b>링크 공유</b></h2>`, `<h4>내 위키를 친구에게 손쉽게 공유해요</h4>`],
          [
            `<h2><b>1,223,848명</b>의</h2>`,
            `<h2>친구들이</h2>`,
            `<h2><b class="green">위키드</b>를 이용하고 있어요</h2>`,
          ],
          [
            `<h2>이제 <b>친구의 TMI를 정리</b>해줄 시간.</h2>`,
            `<h2><b>준비</b>되셨나요?<br/><br/></h2>`,
          ],
        ];
  const lottieRefWiki = useRef(null);
  const lottieRefShare = useRef(null);
  console.log(`screenType : ${screenType}`);

  return (
    <>
      <S.Container>
        {/* hero */}
        <section>
          <div className="section-container">
            <div className="contents" id="section-01">
              <h4>우리만의 인물 백과사전</h4>
              <Image src={HeroTitle} alt="hero" />
              <S.CTA onClick={() => router.push('/login')}>지금 시작하기</S.CTA>
            </div>
            <Section_01 screenType={screenType} />
          </div>
        </section>
        {/* 위키 정리하기 */}
        <section>
          <div className="section-container">
            <div className="contents" id="section-02">
              <SectionContainer lines={contents[0]} sleep={1.5} />
            </div>
            <Graphic
              className="graphic"
              initialOpacity={1}
              posY="0px"
              id="graphic-02"
              lottieRef={lottieRefWiki}
            >
              <Lottie
                animationData={LottieWiki}
                loop={false}
                autoplay={false}
                lottieRef={lottieRefWiki}
              />
            </Graphic>
          </div>
        </section>
        {/* 친구 확인 질문 */}
        <section>
          <div className="section-container">
            <div className="contents" id="section-03">
              <SectionContainer lines={contents[1]} />
            </div>
            <Graphic className="graphic" id="graphic-03">
              <Image src={Qna} alt="qna" />
            </Graphic>
          </div>
        </section>
        {/* 링크 공유 */}
        <section>
          <div className="section-container">
            <div className="contents" id="section-04">
              <SectionContainer lines={contents[2]} sleep={3.5} />
            </div>
            <Graphic className="graphic" id="graphic-04" posY="0px" lottieRef={lottieRefShare}>
              <Lottie
                animationData={LottieShare}
                loop={false}
                autoplay={false}
                lottieRef={lottieRefShare}
              />
            </Graphic>
          </div>
        </section>
        {/* 리뷰 */}
        <section>
          <div className="section-container">
            <div className="contents" id="section-05">
              <SectionContainer lines={contents[3]} />
            </div>
            <div className="graphic" id="graphic-05">
              <Reviews isGoUp={true} />
              <Reviews isGoUp={false} />
            </div>
          </div>
        </section>
        {/* CTA */}
        <section>
          <div className="section-container">
            <div className="contents" id="section-06">
              <SectionContainer lines={contents[4]} />
              <S.CTA onClick={() => router.push('/login')}>지금 시작하기</S.CTA>
            </div>
            <Graphic className="graphic" id="graphic-06">
              <Image src={CtaBackground} alt="cta-background" />
            </Graphic>
          </div>
        </section>
      </S.Container>
    </>
  );
}
