import { useEffect, useState } from 'react';
import axios from 'axios';
import router, { useRouter } from 'next/router';
import Image from 'next/image';
import * as S from './style';

import TempForm from './components/TempForm';
import Pagination from './components/Pagenation';
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

export default function Boards() {
  const [articles, setArticles] = useState([]);
  const [bestArticles, setBestArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('recent');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://wikied-api.vercel.app/14-6/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${search}`
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
      try {
        const res = await axios.get(
          `https://wikied-api.vercel.app/14-6/articles?page=1&pageSize=4&orderBy=like`
        );
        console.log(res.data);
        setBestArticles(res.data.list);
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
                <img className="thumbnail" src={list.image} alt={list.title} />
              ) : (
                <Image className="thumbnail" src={Thumbnail} alt={list.title} />
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
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  setSearch(e.target.value);
                }
              }}
            />
          </div>
          <div className="order-container" onClick={() => setIsOpen(prev => !prev)}>
            {orderBy === 'recent' ? '최신순' : '좋아요순'}
            <Image src={Arrow} alt="arrow" width={22} height={22} />
            <MenuContainer isOpen={isOpen}>
              <MenuItem onClick={() => setOrderBy('recent')}>최신순</MenuItem>
              <MenuItem onClick={() => setOrderBy('like')}>좋아요순</MenuItem>
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
      <Pagination
        pages={[page, setPage]}
        count={totalCount}
        quantity={pageSize}
        pageSection={page}
      />
      <TempForm />
    </S.Container>
  );
}
