import { useRouter } from 'next/router';

export default function Board() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {id}
    </div>
  );
}
