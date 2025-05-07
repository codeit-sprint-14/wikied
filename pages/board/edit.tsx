import dynamic from 'next/dynamic';

<<<<<<< HEAD
const edit = dynamic(() => import('@/components/feature/board/EditLegacy'), {
=======
const edit = dynamic(() => import('@/components/feature/board/Edit'), {
>>>>>>> 883218f (Revert "Merge pull request #35 from codeit-sprint-14/feature/조지현-board-Page")
  ssr: false,
});

export default edit;
