import * as S from '../style';
import Button from '@/components/common/Button';
import { useMemo } from 'react';

export default function TitleSection() {
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  return (
    <S.TitleWrapper>
      <div>
        <S.Title>게시물 등록하기</S.Title>
        <S.DateText>등록일: {today.replace(/-/g, '.')}</S.DateText>
      </div>
      <Button>등록하기</Button>
    </S.TitleWrapper>
  );
}
