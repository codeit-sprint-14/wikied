import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import axios from 'axios';
import color from '@/utils/color';
import Thumbnail from '@/public/images/img-thumbnail.png';
import getDate from '@/utils/getDate';
import HeartIcon from '@/public/icons/ico-heart.svg';
import typo from '@/utils/typo';

interface Writer {
  name: string;
}

interface Article {
  id: number;
  title: string;
  image?: string;
  writer: Writer;
  createdAt: string;
  likeCount: number;
}

const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: -8px 16px 0;
  position: relative;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CardContainer = styled.div`
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    transform: none;
    width: 100%;
    overflow-x: auto;
    padding: 0 20px;
    gap: 12px;
    top: 680px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Card = styled.div`
  width: 250px;
  height: 220px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.2s ease-in-out; // 부드러운 애니메이션을 위한 트랜지션 추가

  &:hover {
    width: 240px; // 10px 감소
    height: 210px; // 10px 감소
    transform: translateY(2px); // 살짝 위로 움직이는 효과
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.03); // hover시 그림자 효과 변경
  }

  @media (max-width: 768px) {
    min-width: 250px;

    &:hover {
      min-width: 240px;
    }
  }
`;

const CardImage = styled.div`
  width: 250px;
  height: 131px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardTitle = styled.h3`
  ${typo('18sb')};
  line-height: 26px;
  letter-spacing: 0%;
  margin: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CardAuthor = styled.p`
  height: 24px;
  ${typo('14sb')};
  line-height: 24px;
  letter-spacing: 0%;
  color: ${color('gray400')};
`;

const CardDate = styled.p`
  height: 24px;
  ${typo('14sb')};
  line-height: 24px;
  letter-spacing: 0%;
  color: ${color('gray400')};
  margin-left: 8px;
`;

const CardHeart = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  margin-left: 0;
`;

const CardLikeCount = styled.span`
  ${typo('14sb')};
  line-height: 100%;
  letter-spacing: 0px;
  text-align: center;
  margin-left: 4px;
  color: ${color('gray400')};
`;

const Title = styled.div`
  width: 209px;
  height: 42px;
  position: fixed;
  top: 65%;
  left: 50%;
  transform: translateX(-50%);
  ${typo('24sb')};
  text-align: center;
  line-height: 42px;
  color: ${color('gray500')};

  @media (max-width: 768px) {
    font-size: 20px;
    width: 100%;
    top: 620px;
  }
`;

const PopCard: React.FC = () => {
  const [bestArticles, setBestArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchBestArticles = async () => {
      try {
        const res = await axios.get<{ list: Article[] }>(
          'https://wikied-api.vercel.app/14-6/articles?page=1&pageSize=4&orderBy=like'
        );
        setBestArticles(res.data.list);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBestArticles();
  }, []);

  return (
    <>
      <Title>요즘 인기있는 글</Title>
      <CardContainer>
        {bestArticles.map(article => (
          <Card key={article.id}>
            <CardImage>
              {article.image ? (
                <img src={encodeURI(article.image)} alt={article.title} />
              ) : (
                <Image
                  src={Thumbnail}
                  alt="default thumbnail"
                  width={250}
                  height={131}
                  style={{ objectFit: 'cover' }}
                />
              )}
            </CardImage>
            <CardTitle>{article.title}</CardTitle>
            <AuthorWrapper>
              <AuthorInfo>
                <CardAuthor>{article.writer.name}</CardAuthor>
                <CardDate>{getDate(article.createdAt)}</CardDate>
              </AuthorInfo>
              <CardHeart>
                <Image src={HeartIcon} alt="heart" width={18} height={18} />
                <CardLikeCount>{article.likeCount}</CardLikeCount>
              </CardHeart>
            </AuthorWrapper>
          </Card>
        ))}
      </CardContainer>
    </>
  );
};

export default PopCard;
