import styled from 'styled-components';
import color from '@/utils/color';
import typo from '@/utils/typo';

export interface CommentInputProps {
  comment: string;
  placeholder?: string;
  maxLength?: number;
  charCount?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  children: React.ReactNode; // 버튼
}

export default function CommentInput({
  comment,
  placeholder,
  maxLength,
  charCount,
  onChange,
  children,
}: CommentInputProps) {
  return (
    <CommentInputWrapper>
      <Textarea
        value={comment}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />

      <ButtomRow>
        {charCount !== undefined && maxLength !== undefined && (
          <CharCount>
            {charCount} / {maxLength}
          </CharCount>
        )}

        <ButtonWrapper>{children}</ButtonWrapper>
      </ButtomRow>
    </CommentInputWrapper>
  );
}

const CommentInputWrapper = styled.div`
  background-color: ${({ theme }) => theme.color['gray100']};
  border-radius: 10px;
  border: none;
  width: 100%;
  max-width: 1064px;
  padding: 25px;
  min-height: 160px;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    max-width: 624px;
  }

  @media (max-width: 480px) {
    width: 90%;
    margin: 0 auto;
  }

  &:focus {
    outling: none;
  }
`;

const Textarea = styled.textarea`
  background-color: ${({ theme }) => theme.color['gray100']};
  border: none;
  width: 100%;
  max-width: 1064px;
  resize: none;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    max-width: 624px;
    max-height: 140px;
  }

  @media (max-width: 480px) {
    width: 90%;
    max-height: 140px;
  }

  &:focus {
    outline: none;
  }
`;

const CharCount = styled.div`
  color: ${color('gray300')};
  ${typo('14r')};
  display: flex;
  justify-content: flex-end;
  margin-top: 19px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtomRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
`;
