import Button from '@/componenets/common/Button';
import styled from 'styled-components';

interface EmptysectionProps {
  text: string;
  buttonText: string;
  onClickButton?: () => void;
}

export default function EmptySection({ text, buttonText, onClickButton }: EmptysectionProps) {
  return (
    <EmptySectionWrapper>
      <Text>{text}</Text>
      <Button onClick={onClickButton}>{buttonText}</Button>
    </EmptySectionWrapper>
  );
}

const EmptySectionWrapper = styled.div`
  background-color: ${({ theme }) => theme.color['gray100']};
  color: ${({ theme }) => theme.color['gray400']};
  ${({ theme }) => theme.typo['18r']};
  border-radius: 10px;
  border: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 40px 20px;
  max-width: 859px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 624px;
    padding: 40px 20px;
  }

  @media (max-width: 767px) {
    width: 100%;
    padding: 40px 16px;
  }
`;

const Text = styled.div`
  white-space: pre-wrap;
  text-align: center;
`;
