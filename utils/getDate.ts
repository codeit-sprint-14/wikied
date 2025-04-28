import { format } from 'date-fns';

export default function getDate(date: string) {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));

  if (diffMonths > 0) {
    return format(date, 'yyyy.MM.dd');
  }
  if (diffDays > 0) {
    return `${diffDays}일 전`;
  }
  if (diffHours > 0) {
    return `${diffHours}시간 전`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes}분 전`;
  }
  return '방금 전';
}
