import Button from '@/components/common/Button';
import styled from 'styled-components';
import color from '@/utils/color';
import typo from '@/utils/typo';

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
  background-color: ${color('gray100')};
  color: ${color('gray400')};
  ${typo('18r')};

  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  padding: 40px 20px;
  max-width: 860px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 624px;
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
