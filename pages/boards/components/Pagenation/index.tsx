import Image from 'next/image';
import * as S from './style';
import PageArrow from '@/public/icons/ico-expand.svg';

function Pagination({
  page,
  count,
  quantity,
  pageSection,
  onPageChange,
}: {
  page: number;
  count: number;
  quantity: number;
  pageSection: number;
  onPageChange: (page: number) => void;
}) {
  const remainedPage = ~~(count / quantity) + 1;

  return (
    <S.Pagination>
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        <Image src={PageArrow} alt="prev page" width={24} height={24} style={{ rotate: '90deg' }} />
      </button>
      {Array(Math.min(remainedPage + 1 - pageSection, 5))
        .fill('')
        .map((_, i) => (
          <button
            className="number"
            disabled={page == pageSection + i}
            onClick={() => onPageChange(pageSection + i)}
            key={i}
          >
            {pageSection + i}
          </button>
        ))}
      <button disabled={page === remainedPage} onClick={() => onPageChange(page + 1)}>
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
