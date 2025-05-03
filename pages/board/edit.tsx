import dynamic from 'next/dynamic';

const Edit = dynamic(() => import('@/components/feature/Edit'), {
  ssr: false,
});

export default Edit;
