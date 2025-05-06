import Button from '@/components/common/Button';
import useScreenType from '@/hooks/useScreenType';
import * as S from '@/styles/boards.style';
import axios from 'axios';
import { getDate } from 'date-fns';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import Thumbnail from '@/public/images/img-thumbnail.png';
import Like from '@/public/icons/ico-heart.svg';
import { useSession } from 'next-auth/react';

export default function BestList({ handleLoading }: { handleLoading: (loading: boolean) => void }) {
  const router = useRouter();
  const screenType = useScreenType();
  const [bestArticles, setBestArticles] = useState([]);
  const { data: session, status } = useSession();

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
        handleLoading(false);
      }
    };

    fetchData();
  }, []);

  function handleWriteClick() {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else {
      router.push('/addboard');
    }
  }

  return (
    <S.BestListContainer>
      <div className="top-container">
        <h1>베스트 게시글</h1>
        <Button onClick={handleWriteClick}>글쓰기</Button>
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
  );
}
