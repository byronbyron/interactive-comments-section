import { useState, useEffect } from 'react';
import { getComments as getCommentsApi, createComment as createCommentApi } from '../api.js';
import Comment from './Comment.js';
import CommentForm from './CommentForm.js';

function Comments({ currentUserId }) {
  const [comments, setComments] = useState([]);

  const getReplies = comment => {
    if (comment.replies.length > 0) return comment.replies;

    return comment;
  }

  const addComment = (text, replyingTo) => {
    createCommentApi(text, replyingTo).then(comment => {
      setComments([...comments, comment]);
    })
  }

  useEffect(() => {
    getCommentsApi().then(data => {
      setComments(data);
    })
  }, []);

  return (
    <>
      <ul>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            replies={getReplies(comment)}
          />
        ))}
      </ul>

      <CommentForm submitLabel="Send" handleSubmit={addComment} />
    </>
  );
}

export default Comments;
