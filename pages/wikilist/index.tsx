import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBox from './components/searchbox';
import SearchResult from './components/searchresult';
import Pagination from './components/pagebutton';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Wikilist() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('recent');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalCount, setTotalCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

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

  // 실제 데이터 API 호출 (예시)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://wikied-api.vercel.app/14-6/profiles?page=1&pageSize=4`
        );
        console.log(res.data);
        setArticles(res.data.list);
        setTotalCount(res.data.totalCount);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, orderBy, page, pageSize]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // searchQuery를 쿼리 파라미터로 전달
        const res = await axios.get(
          `https://wikied-api.vercel.app/14-6/profiles?page=${page}&pageSize=${pageSize}&search=${searchQuery}`
        );

        // 검색어와 일치하는 항목만 필터링
        const filteredResults = res.data.list.filter(article =>
          article.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setArticles(filteredResults);
        setTotalCount(filteredResults.length); // 필터링된 결과의 개수를 설정
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, orderBy, page, pageSize, searchQuery]); // searchQuery를 의존성 배열에 추가

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // 검색할 때마다 첫 페이지로 이동
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
          {articles.map((article, index) => (
            <SearchResult
              key={index}
              name={article.name}
              location={article.location}
              occupation={article.occupation}
            />
          ))}
        </SearchResultsContainer>
        <Pagination
          pages={[page, setPage]}
          count={totalCount}
          quantity={pageSize}
          pageSection={page}
        />
      </SearchContainer>
    </MainContent>
  );
}
