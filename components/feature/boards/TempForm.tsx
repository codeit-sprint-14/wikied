import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function TempForm() {
  const { data: session } = useSession();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get('title');
    const content = formData.get('content');
    const image = formData.get('image');
    console.log(title, content, image);

    try {
      const response = await axios.post(
        'https://wikied-api.vercel.app/14-6/articles',
        {
          title,
          content,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      console.log('글쓰기 성공:', response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>임시 글쓰기</h1>
      <input name="title" type="text" placeholder="제목" />
      <input name="content" type="text" placeholder="내용" />
      <input name="image" type="text" placeholder="이미지 주소" />
      <button type="submit">제출</button>
    </form>
  );
}
