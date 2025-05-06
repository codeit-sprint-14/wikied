import React from 'react';
import CommentItem from './CommentItem';
import type { CommentItemProps } from './CommentItem';

export interface CommentListProps {
  comments: CommentItemProps['comment'][];

  renderIcon?: (commentId: number) => React.ReactNode;
  onIconClick?: (commentId: number) => void;
}

export default function CommentList({ comments, renderIcon, onIconClick }: CommentListProps) {
  return (
    <div>
      {Array.isArray(comments) &&
        comments.map((comment, index) => (
          <CommentItem
            key={comment.id ?? index}
            comment={comment}
            icon={renderIcon?.(comment.id)}
            onIconClick={onIconClick}
          />
        ))}
    </div>
  );
}
