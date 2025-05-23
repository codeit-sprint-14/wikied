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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 48px;
  }
`;

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
  display: flex;
  gap: 16px;

  @media (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    padding: 0 20px 20px 0;
    gap: 12px;
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
  transition: all 0.1s ease-out;
  cursor: pointer;

  &:hover {
    filter: brightness(0.98);

    img {
      transform: scale(1.05);
    }
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 160px;
  }
`;

const CardImage = styled.div`
  width: 250px;
  height: 131px;

  img {
    transition: all 0.2s ease-out;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 480px) {
    width: 200px;
    height: 80px;
  }
`;

const CardTitle = styled.h3`
  ${typo('18sb')};
  line-height: 26px;
  letter-spacing: 0%;
  text-align: left;
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
  ${typo('24sb')};
  text-align: center;
  line-height: 42px;
  color: ${color('gray500')};

  @media (max-width: 768px) {
    ${typo('20sb')};
    width: 100%;
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
    <Container>
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
    </Container>
  );
};

export default PopCard;
