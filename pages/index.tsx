import Button from '@/componenets/common/Button';
import Input from '@/componenets/common/Input';
import color from '@/utils/color';
import typo from '@/utils/typo';
import styled from 'styled-components';

const Container = styled.div`
  /********************** 템플릿 사용 가이드 **************************/

  ${typo('18sb')}; // 폰트는 바로 작성
  color: ${color('red200')}; // 컬러는 원하는 속성에 작성
`;

export default function Home() {
  return (
    <>
      <Container>
        hello world
        <br />
        <Input placeholder="아이디를 입력하세요" width="200px" />
        <Input variant="error" placeholder="답안을 입력해주세요" />
        <Button>내 위키 만들기</Button>
        <Button color="purple100">내 위키 만들기</Button>
        <Button variant="outline">내 위키 만들기</Button>
        <Button variant="outline" color="red200">
          내 위키 만들기
        </Button>
        <Button disabled width="200px">
          <span style={{ display: 'flex' }}>
            편집 중
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M16 12a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2"
              />
            </svg>
          </span>
        </Button>
      </Container>
    </>
  );
}
