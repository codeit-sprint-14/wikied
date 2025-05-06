import useScreenType from '@/hooks/useScreenType';
import * as S from '@/styles/boards.style';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Input from '@/components/common/Input';
import { getApi } from '@/utils/getApi';
import getDate from '@/utils/getDate';

import Search from '@/public/icons/ico-search.svg';
import Like from '@/public/icons/ico-heart.svg';
import Writer from '@/public/icons/ico-writer.svg';
import Clock from '@/public/icons/ico-clock.svg';
import Arrow from '@/public/icons/ico-arrow.svg';

import { MenuContainer, MenuItem } from '@/components/common/Menu';

export default function List({
  handleTotalCount,
  handleLoading,
}: {
  handleTotalCount: (count: number) => void;
  handleLoading: (loading: boolean) => void;
}) {
  const router = useRouter();
  const screenType = useScreenType();
  const [isOpen, setIsOpen] = useState(false);

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        handleLoading(true);
        const { page = 1, pageSize = 20, orderBy = 'recent', keyword = '' } = router.query;
        const params = {
          page: page as string,
          pageSize: pageSize as string,
          orderBy: orderBy as string,
          keyword: keyword as string,
        };
        const queryString = new URLSearchParams(params).toString();

        const res = await axios.get(`${getApi()}/articles?${queryString}`);
        setArticles(res.data.list);
        handleTotalCount(res.data.totalCount);
      } catch (err) {
        console.error(err);
      } finally {
        handleLoading(false);
      }
    };

    fetchData();
  }, [router.query]);

  return (
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
                  query: { ...router.query, keyword: e.currentTarget.value },
                });
              }
            }}
          />
        </div>
        {screenType !== 'mobile' ? (
          <div className="order-container" onClick={() => setIsOpen(prev => !prev)}>
            {router.query.orderBy === 'like' ? '좋아요순' : '최신순'}
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
        ) : (
          <>
            <div className="order-radio-container">
              <input
                type="radio"
                name="recent"
                id="radio__recent"
                checked={router.query.orderBy !== 'like'}
                onChange={() =>
                  router.push({
                    pathname: router.pathname,
                    query: { ...router.query, orderBy: 'recent' },
                  })
                }
              />
              <label htmlFor="radio__recent">최신순</label>
              <input
                type="radio"
                name="like"
                id="radio__like"
                checked={router.query.orderBy === 'like'}
                onChange={() =>
                  router.push({
                    pathname: router.pathname,
                    query: { ...router.query, orderBy: 'like' },
                  })
                }
              />
              <label htmlFor="radio__like">좋아요순</label>
            </div>
          </>
        )}
      </div>
      <ul className="article-container">
        {articles.map((article: any) => (
          <li key={article.id} onClick={() => router.push(`/board/${article.id}`)}>
            {screenType === 'mobile' ? (
              <>
                <div className="upper-container">
                  <span className="title">{article.title}</span>
                </div>
                <div className="lower-container">
                  <span className="writer">{article.writer.name}</span>
                  <span className="date">{getDate(article.createdAt)}</span>
                  <span className="like-count">
                    <Image src={Like} alt="like" width={18} height={18} />
                    {article.likeCount}
                  </span>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </li>
        ))}
      </ul>
    </S.ListContainer>
  );
}
