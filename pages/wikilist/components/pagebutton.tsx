import Image from 'next/image';
import * as S from '../style';
import PageArrow from '@/public/icons/ico-expand.svg';

function Pagination({
  pages,
  count,
  quantity,
  pageSection,
}: {
  pages: [number, (page: number) => void];
  count: number;
  quantity: number;
  pageSection: number;
}) {
  const [page, setPage] = pages;
  const remainedPage = ~~(count / quantity) + 1;

  return (
    <S.Pagination>
      <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>
        <Image src={PageArrow} alt="prev page" width={24} height={24} style={{ rotate: '90deg' }} />
      </button>
      {Array(Math.min(remainedPage + 1 - pageSection, 5))
        .fill('')
        .map((_, i) => (
          <button
            className="number"
            disabled={page == pageSection + i}
            onClick={() => setPage(pageSection + i)}
            key={i}
          >
            {pageSection + i}
          </button>
        ))}
      <button disabled={page === remainedPage} onClick={() => setPage(prev => prev + 1)}>
        <Image
          src={PageArrow}
          alt="next page"
          width={24}
          height={24}
          style={{ rotate: '-90deg' }}
        />
      </button>
    </S.Pagination>
  );
}

export default Pagination;
