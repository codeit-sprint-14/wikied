import dynamic from 'next/dynamic';

const edit = dynamic(() => import('@/components/feature/Edit'), {
  ssr: false,
});

export default edit;
