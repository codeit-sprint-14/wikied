import { useEffect, useState } from 'react';
import axios from 'axios';
import router, { useRouter } from 'next/router';
import Image from 'next/image';
import * as S from '@/styles/boards.style';

import TempForm from './components/TempForm';
import Pagination from '@/components/feature/Pagination';
import getDate from '@/utils/getDate';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Search from '@/public/icons/ico-search.svg';
import Like from '@/public/icons/ico-heart.svg';
import Writer from '@/public/icons/ico-writer.svg';
import Clock from '@/public/icons/ico-clock.svg';
import Arrow from '@/public/icons/ico-arrow.svg';
import Thumbnail from '@/public/images/img-thumbnail.png';
import { MenuContainer, MenuItem } from '@/components/common/Menu';
import { getApi } from '@/utils/getApi';

export default function Boards() {
  const [articles, setArticles] = useState([]);
  const [bestArticles, setBestArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalCount, setTotalCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [winSize, setWinSize] = useState('desktop');

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1024) {
        setWinSize('desktop');
      } else if (window.innerWidth > 768) {
        setWinSize('tablet');
      } else {
        setWinSize('mobile');
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { page = 1, pageSize = 20, orderBy = 'recent', search } = router.query;
        const params = {
          page,
          pageSize,
          orderBy,
          search,
        };
        const queryString = new URLSearchParams(params).toString();

        const res = await axios.get(`${getApi()}/articles?${queryString}`);
        setArticles(res.data.list);
        setTotalCount(res.data.totalCount);
        console.log(`res.data:${JSON.stringify(res.data)}`);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router.query]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://wikied-api.vercel.app/14-6/articles?page=1&pageSize=4&orderBy=like`
        );
        setBestArticles(res.data.list);

        console.log(res.data.list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <S.Container>
      <S.BestListContainer>
        <div className="top-container">
          <h1>베스트 게시글</h1>
          <Button onClick={() => router.push('/addboard')}>글쓰기</Button>
        </div>
        <ul>
          {bestArticles.map((list: any) => (
            <li key={list.id} onClick={() => router.push(`/board/${list.id}`)}>
              {list.image ? (
                <img className="thumbnail" src={encodeURI(list.image)} alt={list.title} />
              ) : (
                <Image className="thumbnail" src={Thumbnail} alt={list.title} unoptimized />
              )}
              <div className="text-container">
                <h2>{list.title}</h2>
                <div className="bottom-container">
                  <div className="left-container">
                    <p>{list.writer.name}</p>
                    <p>{getDate(list.createdAt)}</p>
                  </div>
                  <div className="right-container">
                    <Image src={Like} alt="like" width={18} height={18} />
                    <p>{list.likeCount}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </S.BestListContainer>
      <S.ListContainer>
        <div className="top-container">
          <div className="search-container">
            <Image className="search-icon" src={Search} alt="search" />
            <Input
              placeholder="검색어를 입력해주세요"
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  router.push({
                    pathname: router.pathname,
                    query: { ...router.query, search: e.currentTarget.value },
                  });
                }
              }}
            />
          </div>
          <div className="order-container" onClick={() => setIsOpen(prev => !prev)}>
            {router.query.orderBy === 'recent' ? '최신순' : '좋아요순'}
            <Image src={Arrow} alt="arrow" width={22} height={22} />
            <MenuContainer isOpen={isOpen}>
              <MenuItem
                onClick={() =>
                  router.push({
                    pathname: router.pathname,
                    query: { ...router.query, orderBy: 'recent' },
                  })
                }
              >
                최신순
              </MenuItem>
              <MenuItem
                onClick={() =>
                  router.push({
                    pathname: router.pathname,
                    query: { ...router.query, orderBy: 'like' },
                  })
                }
              >
                좋아요순
              </MenuItem>
            </MenuContainer>
          </div>
        </div>
        <ul className="article-container">
          {articles.map((article: any) => (
            <li key={article.id} onClick={() => router.push(`/board/${article.id}`)}>
              <span className="like-count">
                <Image src={Like} alt="like" width={18} height={18} />
                {article.likeCount}
              </span>
              <span className="title">{article.title}</span>
              <span className="writer">
                <Image src={Writer} alt="writer" width={18} height={18} />
                {article.writer.name}
              </span>
              <span className="date">
                <Image src={Clock} alt="date" width={18} height={18} />
                {getDate(article.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      </S.ListContainer>
      <Pagination totalCount={totalCount} />
      <TempForm />
    </S.Container>
  );
}
