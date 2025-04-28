import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBox from './components/searchbox';
import SearchResult from './components/searchresult';
import Pagination from './components/pagebutton';

const MainContent = styled.div`
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center; /* SearchContainer를 센터로 배치 */
`;
const SearchResultsContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: 868px; /* 1열 */
  /* 최대 4개 표시 (1열 x 4행) */
`;
const SearchContainer = styled.div`
  width: 860px; /* SearchBox와 동일한 너비 */
  text-align: left; /* 내부 문구를 왼쪽 정렬 */
`;
const ResultMessage = styled.div`
  margin-top: 16px;
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0%;
`;

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    // API 호출 등 실제 데이터 로직 추가
  }, [searchQuery, page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  return (
    <MainContent>
      <SearchContainer>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />
        {searchQuery && (
          <ResultMessage>
            "{searchQuery}"님을 총 {totalCount}명 찾았습니다.
          </ResultMessage>
        )}
        <SearchResultsContainer>
          <SearchResult />
          <SearchResult />
          <SearchResult />
          <SearchResult />
        </SearchResultsContainer>
        <Pagination
          pages={[page, setPage]}
          count={totalCount}
          quantity={pageSize}
          pageSection={1}
        />
      </SearchContainer>
    </MainContent>
  );
}
