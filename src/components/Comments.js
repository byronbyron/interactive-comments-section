import { useState, useEffect } from 'react';
import { getComments as getCommentsApi } from '../api.js';
import Comment from './Comment.js';

function Comments({ currentUserId }) {
  const [comments, setComments] = useState([]);

  const getReplies = comment => {
    if (comment.replies.length > 0) return comment.replies;
    
    return comment;
  }

  useEffect(() => {
    getCommentsApi().then(data => {
      setComments(data);
    })
  }, []);

  return (
    <ul>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          replies={getReplies(comment)}
        />
      ))}
    </ul>
  );
}

export default Comments;
