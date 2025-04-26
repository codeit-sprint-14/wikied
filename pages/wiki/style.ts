import styled from 'styled-components';
import color from '@/utils/color';
import typo from '@/utils/typo';

export const WikiSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 80px;
  width: 100%;
  padding-top: 160px;
  padding-bottom: 50px;
`;
export const WikiSectionInner = styled.div`
  position: relative;
  flex-basis: 900px;
  height: 100%;
`;
export const Name = styled.h2`
  color: ${color('gray500')};
  ${typo('48sb')};
`;
export const WikiLink = styled.p`
  display: inline-block;
  margin-top: 20px;
  padding: 5px 10px;
  ${typo('14r')};
  color: ${color('green200')};
  background-color: ${color('green100')};
  border-radius: 10px;
  cursor: pointer;
`;
export const WikiMessage = styled.span`
  text-align: center;
  ${typo('16r')};
  color: ${color('gray400')};
`;
export const WikiContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 56px;
  padding: 40px 0;
  border-radius: 10px;
  row-gap: 20px;
  background-color: ${color('gray100')};
`;
export const Sidebar = styled.div`
  width: 350px;
  height: fit-content;
  padding: 60px 30px 36px 30px;
  background-color: ${color('gray50')};
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;
export const ImageWrap = styled.div<{ step: 'editor' }>`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto;
  overflow: hidden;

  &::before {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-color: ${({ step }) => (step === 'editor' ? 'rgba(0,0,0,0.4)' : '')};
    background-image: ${({ step }) => (step === 'editor' ? 'url("/icons/ico-camera.svg")' : '')};
    background-repeat: no-repeat;
    background-position: center;
    background-size: 30% 30%;
    cursor: ${({ step }) => (step === 'editor' ? 'pointer' : 'auto')};
    transition: all 0.2s;
  }
  &:hover::before {
    background-color: ${({ step }) =>
      step === 'editor' ? 'rgba(0,0,0,0.6)' : ''}; /* 호버 시 배경 색상 변경 */
  }
`;
export const UserInfoWrap = styled.div`
  margin-top: 60px;
`;

export const UserInfo = styled.ul`
  width: 100%;
`;
export const InfoItem = styled.li`
  display: flex;
  align-items: center;
  column-gap: 20px;
  & + li {
    margin-top: 18px;
  }
`;
export const InfoTitle = styled.span`
  flex-basis: 70px;
  flex-shrink: 0;
  ${typo('14r')};
  color: ${color('gray400')};
`;
export const InfoData = styled.div`
  flex-basis: 100%;
`;
export const InfoInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background-color: ${color('gray100')};
  border-radius: 10px;
  padding: 10px 20px;

  &:focus {
    background-color: ${color('gray200')};
    outline: 1px solid ${color('green100')};
  }
`;

export const QuillWrap = styled.div`
  margin-top: 40px;
`;
export const QuillBox = styled.div`
  height: 500px;

  .quill {
    height: calc(100% - 43px);
  }
`;
export const ButtonWrap = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const ViewerContainer = styled.div`
  margin-top: 20px;
`;
export const ViewerButton = styled.div`
  position: absolute;
  top: 16px;
  right: 0;
`;
export const Viewer = styled.div`
  line-height: 1.6;
  font-size: 1rem;
  color: #333;

  h1,
  h2,
  h3 {
    font-weight: bold;
    line-height: 1.4;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }

  ul,
  ol {
    margin: 1rem 0 1.5rem 1.5rem;
    padding-left: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #3498db;
    text-decoration: underline;
    word-break: break-word;
    &:hover {
      color: #217dbb;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1rem 0;
  }

  strong,
  b {
    font-weight: bold;
  }

  em,
  i {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  .ql-align-center {
    text-align: center;
  }

  .ql-align-right {
    text-align: right;
  }
`;
