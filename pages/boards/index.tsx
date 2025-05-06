import { useState } from 'react';
import * as S from '@/styles/boards.style';
import Pagination from '@/components/feature/Pagination';
import BestList from '@/components/feature/boards/BestList';
import List from '@/components/feature/boards/List';

export default function Boards() {
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  function handleTotalCount(count: number) {
    setTotalCount(count);
  }
  function handleLoading(loading: boolean) {
    setLoading(loading);
  }

  return (
    <S.Container>
      <BestList handleLoading={handleLoading} />
      <List handleTotalCount={handleTotalCount} handleLoading={handleLoading} />
      <Pagination totalCount={totalCount} />
    </S.Container>
  );
}
