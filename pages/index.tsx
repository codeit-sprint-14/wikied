import color from '@/utils/color';
import styled from 'styled-components';
import Section_01 from './home/Section_01';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import typo from '@/utils/typo';
import router from 'next/router';

import HeroTitle from '@/public/images/img-hero-title.svg';
import Qna from '@/public/images/img-qna.svg';
import Image from 'next/image';

const Container = styled.div`
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  width: 100vw;
  height: calc(100vh - 80px);
  background: ${color('gray200')};
  margin-top: 80px;
  position: relative;

  .contents {
    position: absolute;
    white-space: nowrap;
    z-index: 10;
    //히어로
    &#section-01 {
      top: 0px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 450px;
    }

    //위키 정리하기
    &#section-02 {
      top: 96px;
      left: 96px;
    }

    //친구 확인 질문
    &#section-03 {
      top: 96px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
    }

    //링크 공유
    &#section-04 {
      bottom: 128px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
    }

    //위키드 사용중
    &#section-05 {
      top: 96px;
      left: 96px;
    }

    //CTA
    &#section-06 {
      top: 128px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  h2 {
    font-size: 80px;
    font-weight: 600;
    line-height: 130%;
    color: ${color('gray400')};

    b {
      font-weight: 800;
      color: ${color('gray500')};

      &.green {
        color: ${color('green300')};
      }
    }
  }

  h4 {
    color: ${color('gray400')};
    ${typo('24sb')};
    margin: 12px 0;
  }

  section {
    scroll-snap-align: start;
    width: 100%;
    height: 100%;
    padding: 40px;

    .section-container {
      width: 100%;
      height: 100%;
      background: ${color('gray50')};
      border-radius: 40px;
      position: relative;
    }
  }
`;

export const CTA = styled.button`
  width: 156px;
  height: 52px;
  border-radius: 100px;
  border: 2px solid ${color('green300')};
  justify-content: center;
  align-items: center;
  background: hsla(0, 0%, 100%, 0.7);
  backdrop-filter: blur(20px);
  color: ${color('green300')};
  ${typo('16sb')};
  transition: all 0.1s ease-out;
  cursor: pointer;
  z-index: 10;
  position: absolute;
  bottom: 0;

  &:hover {
    background: ${color('green300')};
    color: ${color('gray50')};
  }
`;

function SectionContainer({ lines, children, sleep = 1, ...rest }: { lines: string[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} {...rest}>
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 300 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, ease: 'easeOut', type: 'tween' }}
        >
          {children}
        </motion.div>
      )}
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: sleep + i * 0.25, ease: 'easeOut', type: 'tween' }}
          dangerouslySetInnerHTML={{ __html: line }}
        />
      ))}
    </div>
  );
}
function Graphic({ children, sleep = 0.5, posY = '300px', ...rest }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} {...rest}>
      <motion.div
        initial={{ opacity: 0, y: posY }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: sleep, ease: 'easeOut', type: 'tween' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const contents = [
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
    [`<h2>이제 <b>친구의 TMI를 정리</b>해줄 시간.</h2>`, `<h2><b>준비</b>되셨나요?<br/><br/></h2>`],
  ];
  return (
    <>
      <Container>
        <section>
          <div className="section-container">
            <div className="contents" id="section-01">
              <h4>우리만의 인물 백과사전</h4>
              <Image src={HeroTitle} alt="hero" width={568} height={214} />
              <CTA onClick={() => router.push('/login')}>지금 시작하기</CTA>
            </div>
            <Section_01 />
          </div>
        </section>
        <section>
          <div className="section-container">
            <div className="contents" id="section-02">
              <SectionContainer lines={contents[0]} />
              <Graphic>
                <Image src={Qna} width={746} height={774} />
              </Graphic>
            </div>
          </div>
        </section>
        <section>
          <div className="section-container">
            <div className="contents" id="section-03">
              <SectionContainer lines={contents[1]} />
              <Graphic>
                <Image src={Qna} width={746} height={774} />
              </Graphic>
            </div>
          </div>
        </section>
        <section>
          <div className="section-container">
            <div className="contents" id="section-04">
              <SectionContainer lines={contents[2]} />
              <Graphic>
                <Image src={Qna} width={746} height={774} />
              </Graphic>
            </div>
          </div>
        </section>
        <section>
          <div className="section-container">
            <div className="contents" id="section-05">
              <SectionContainer lines={contents[3]} />
              <Graphic>
                <Image src={Qna} width={746} height={774} />
              </Graphic>
            </div>
          </div>
        </section>
        <section>
          <div className="section-container">
            <div className="contents" id="section-06">
              <SectionContainer lines={contents[4]} />
              <CTA onClick={() => router.push('/login')}>지금 시작하기</CTA>
              <Graphic>
                <Image src={Qna} width={746} height={774} />
              </Graphic>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
