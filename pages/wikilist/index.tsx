import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Thumbnail from '@/public/images/img-thumbnail.png';
import Input from '@/components/common/Input';
import Search from '@/public/icons/ico-search.svg';
import NotFound from '@/public/images/img-not-found.svg';
import * as S from '@/styles/wikilist.style';
import Pagination from '@/components/feature/Pagination';

function WikiList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://wikied-api.vercel.app/14-6/profiles?page=${router.query.page || 1}&pageSize=${20}&name=${router.query.search || ''}`
        );
        // const userList = await Promise.all(
        //   res.data.list.map(async (v: any) => {
        //     try {
        //       const detailRes = await axios.get(
        //         `https://wikied-api.vercel.app/14-6/profiles/${v.code}`
        //       );
        //       const detailList = detailRes.data;
        //       return detailList;
        //     } catch (err) {
        //       console.error(err);
        //     }
        //   })
        // );
        setArticles(res.data.list);
        setTotalCount(res.data.totalCount);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router.query]);

  return (
    <S.Container>
      <div className="search-container">
        <Image className="search-icon" src={Search} alt="search" />
        <Input
          placeholder="닉네임 검색"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              router.push(`/wikilist?search=${e.currentTarget.value}`);
            }
          }}
        />
      </div>
      {totalCount > 0 && (
        <span className="total-count">
          {router.query.search ? (
            <>
              <b>{totalCount}</b>명의 프로필을 찾았어요
            </>
          ) : (
            <>
              위키드에 <b>{totalCount}</b>명의 프로필이 있어요
            </>
          )}
        </span>
      )}
      <S.ListContainer>
        {articles.length > 0 ? (
          articles.map(article => (
            <li key={article.id} onClick={() => router.push(`/wiki/${article.code}`)}>
              <div className="image-container">
                {article.image ? (
                  <Image src={encodeURI(article.image)} alt={article.name} width={94} height={94} />
                ) : (
                  <Image src={Thumbnail} alt={article.name} width={94} height={94} />
                )}
              </div>
              <div className="contents">
                <div className="contents-top">
                  <h2>{article.name}</h2>
                </div>
                <div className="content-bottom">
                  <span>{article.birthday || ''}</span>
                  <span>{article.job || ''}</span>
                </div>
                {/* <p>{article.content ? article.content.replace(/<[^>]*>?/gm, '') : '소개글 없음'}</p> */}
              </div>
            </li>
          ))
        ) : (
          <div className="no-result">
            <Image src={NotFound} alt="not found" />
            <span>
              <b>{router.query.search}</b>님을 찾지 못했어요 :(
            </span>
          </div>
        )}
      </S.ListContainer>
      <Pagination totalCount={totalCount} />
    </S.Container>
  );
}

export default WikiList;

// {
//     "id": 725,
//     "code": "5575c062-5cea-40a4-98c3-822dbba48169",
//     "image": "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wikied/user/2394/1745690443010/%C3%AC%C2%8A%C2%A4%C3%AD%C2%81%C2%AC%C3%AB%C2%A6%C2%B0%C3%AC%C2%83%C2%B7%202025-03-31%20160610.png",
//     "city": "",
//     "mbti": "",
//     "job": "",
//     "sns": "",
//     "birthday": "",
//     "nickname": "",
//     "bloodType": "",
//     "family": "",
//     "nationality": "",
//     "content": "<p>안녕하세요 물개입니다.</p>",
//     "teamId": "14-6",
//     "securityQuestion": "질문",
//     "updatedAt": "2025-04-26T18:00:51.356Z",
//     "name": "김성빈225"
//   },
