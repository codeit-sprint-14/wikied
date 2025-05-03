import styled from 'styled-components';
import color from '@/utils/color';
import typo from '@/utils/typo';

export const Header = styled.div``;
export const WikiSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 80px;
  width: 100%;
  padding: 160px 20px 50px 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 40px;
    padding-top: 120px;
  }
`;
export const WikiSectionInner = styled.div`
  position: relative;
  flex-basis: 900px;
  height: 100%;
  @media (max-width: 1024px) {
    position: static;
    order: 3;
  }
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
  @media (max-width: 1024px) {
    margin-top: 30px;
  }
`;
export const Sidebar = styled.div<{ isOpen: boolean }>`
  position: relative;
  max-width: 350px;
  width: 100%;
  height: fit-content;
  padding: 60px 30px 36px 30px;
  background-color: ${color('gray50')};
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  @media (max-width: 1024px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    max-width: unset;
    height: ${({ isOpen }) => (isOpen ? '330px' : '240px')};
    transition: height 0.3s ease;
    gap: 50px;
    padding: 30px;
    order: 2;
  }
`;
export const SlideButton = styled.div<{ visible: boolean }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  cursor: pointer;
`;
export const ImageWrap = styled.div<{ step: 'editor' | 'done' }>`
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
    background-color: ${({ step }) => (step === 'editor' ? 'rgba(0,0,0,0.6)' : '')};
  }

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1024px) {
    margin: unset;
    width: 150px;
    height: 150px;
    flex-basis: 150px;
    flex-shrink: 0;
  }
`;
export const UserInfoWrap = styled.div`
  margin-top: 60px;
  flex-basis: 100%;

  @media (max-width: 1024px) {
    margin-top: 0px;
  }
`;

export const UserInfo = styled.ul<{ isOpen: boolean }>`
  width: 100%;
  @media (max-width: 1024px) {
    height: ${({ isOpen }) => (isOpen ? '300px' : '172px')};
    overflow: hidden;
    transition: height 0.3s ease;
  }
`;
export const InfoItem = styled.li`
  display: flex;
  align-items: center;
  column-gap: 20px;
  & + li {
    margin-top: 18px;
  }

  @media (max-width: 1024px) {
    & + li {
      margin-top: 10px;
    }
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
  .ql-toolbar.ql-snow {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: ${color('gray100')};
    border-radius: 10px;
    padding: 10px;
    border: none;
  }

  .ql-container.ql-snow {
    border: none;
  }

  .ql-editor {
    padding: 16px;
    min-height: 200px;
    white-space: pre-wrap;
  }
  .ql-toolbar .ql-formats .ql-active {
    background-color: ${color('gray200')};
    color: white;
    border-radius: 5px;
  }
  .ql-picker.ql-header {
    .ql-picker-label,
    .ql-picker-item {
      color: ${color('gray400')};
      font-weight: 500;
    }

    .ql-picker-options {
      background-color: #fff;
      border: 1px solid ${color('gray400')};
    }

    .ql-picker-item:hover {
      color: ${color('gray500')};
    }
  }
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
  @media (max-width: 1024px) {
    top: 135px;
    right: 20px;
  }
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
