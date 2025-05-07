import dynamic from 'next/dynamic';

const edit = dynamic(() => import('@/components/feature/board/Edit'), {
  ssr: false,
});

export default edit;
