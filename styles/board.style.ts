import styled from 'styled-components';
import color from '@/utils/color';
import typo from '@/utils/typo';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 150px 30px;

  @media (max-width: 768px) {
    padding: 120px 30px;
  }

  @media (max-width: 480px) {
    padding: 110px 20px;
  }
`;

export const ContentBox = styled.div`
  width: 100%;
  max-width: 1060px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const UnderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 60px;
`;

export const CommentCount = styled.div`
  margin-left: 6px;
  ${typo('18sb')};
  color: ${color('gray500')};

  @media (max-width: 480px) {
    margin-left: 23px;
  }
`;

export const CommentLength = styled.span`
  color: ${color('green200')};
  ${typo('18sb')};
`;

export const NoCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 35px;
`;

export const NoCommentText = styled.div`
  ${typo('16r')};
  color: ${color('gray400')};
  margin: 30px;
  align-items: center;
  justify-content: center;
`;

export const HeartWrapper = styled.div`
  width: 17px;
  height: 17px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  margin-left: -30px;
`;
