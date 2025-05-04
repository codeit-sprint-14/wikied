import Image from 'next/image';
import * as S from '@/styles/pagination.style';
import PageArrow from '@/public/icons/ico-expand.svg';
import { useRouter } from 'next/router';

function Pagination({ totalCount }) {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const pageSize = Number(router.query.pageSize) || 20;
  const totalPage = Math.ceil(totalCount / pageSize);

  const groupSize = 5;
  const currentGroup = Math.floor((page - 1) / groupSize);
  const startPage = currentGroup * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPage);

  const moveToPage = targetPage => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: targetPage },
    });
  };

  return (
    <S.Pagination>
      <button disabled={page === 1} onClick={() => moveToPage(page - 1)}>
        <Image src={PageArrow} alt="prev page" width={24} height={24} style={{ rotate: '90deg' }} />
      </button>

      {Array(Math.max(endPage - startPage + 1, 0))
        .fill('')
        .map((_, i) => {
          const pageNum = startPage + i;
          return (
            <button
              key={pageNum}
              className="number"
              disabled={page === pageNum}
              onClick={() => moveToPage(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}

      <button disabled={page === totalPage} onClick={() => moveToPage(page + 1)}>
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
