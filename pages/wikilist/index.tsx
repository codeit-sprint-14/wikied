import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBox from './components/searchbox';

const MainContent = styled.div`
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center; /* SearchContainer를 센터로 배치 */
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <MainContent>
      <SearchContainer>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />
        {searchQuery && <ResultMessage>"{searchQuery}"님을 총 명 찾았습니다.</ResultMessage>}
      </SearchContainer>
    </MainContent>
  );
}
