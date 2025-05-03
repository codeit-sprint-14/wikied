import Image from 'next/image';
import styled from 'styled-components';
import defaultProfile from '@/public/icons/ico-profile.svg';
import React from 'react';

export interface CommentItemProps {
  comment: {
    id: number;
    content: string;
    createdAt: string;
    writer: {
      id: number;
      name: string;
      profileImage: string;
    };
  };
  icons?: { element: React.ReactNode; onClick: (commnetId: number) => void }[];
}

export default function CommentItem({ comment, icons }: CommentItemProps) {
  const { writer, content, createdAt } = comment;
  const date = new Date(createdAt).toLocaleDateString('ko-KR');

  return (
    <CommentItemWrapper>
      <TopRow>
        <ProfileImg
          src={writer.profileImage || defaultProfile}
          alt={`${writer.name}의 프로필`}
          width={50}
          height={50}
        />
        <RightSection>
          <TopContentRow>
            <NickNameAndContent>
              <Nickname>{writer.name}</Nickname>
              <Content>
                {content.split('\\n').map((line, index) => (
                  <span key={index}>{line}</span>
                ))}
              </Content>
            </NickNameAndContent>

            {icons && (
              <IconWrapper>
                {icons.map((iconObj, index) => (
                  <div key={index} onClick={() => iconObj.onClick?.(comment.id)}>
                    {iconObj.element}
                  </div>
                ))}
              </IconWrapper>
            )}
          </TopContentRow>

          <CreatedAt>{date}</CreatedAt>
        </RightSection>
      </TopRow>
    </CommentItemWrapper>
  );
}
export const CommentItemWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color['gray200']};

  max-width: 1064px;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 624px;
    padding: 16px;
    width: 100%;
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;

export const TopRow = styled.div`
  display: flex;
  gap: 19px;
`;

export const ProfileImg = styled(Image)`
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  min-width: 0;
`;

export const TopContentRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  gap: 8px;
`;

export const NickNameAndContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  gap: 8px;
`;

export const IconWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  cursor: pointer;
`;

export const Nickname = styled.div`
  color: ${({ theme }) => theme.color['gray500']};
  ${({ theme }) => theme.typo['18sb']};
`;

export const Content = styled.div`
  color: ${({ theme }) => theme.color['gray500']};
  ${({ theme }) => theme.typo['16r']};
  line-height: 1.5;
  word-break: break-all;
  white-space: pre-line;
`;

export const CreatedAt = styled.div`
  color: ${({ theme }) => theme.color['gray400']};
  ${({ theme }) => theme.typo['14r']};
`;
