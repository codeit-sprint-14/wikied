import dynamic from 'next/dynamic';

const edit = dynamic(() => import('@/components/feature/board/EditLegacy'), {
  ssr: false,
});

export default edit;
