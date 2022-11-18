import { useState, useEffect } from 'react';
import {
    getComments as getCommentsApi,
    createComment as createCommentApi,
    deleteComment as deleteCommentApi
} from '../api.js';
import Comment from './Comment.js';
import CommentForm from './CommentForm.js';

function Comments({ currentUsername }) {
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const getReplies = comment => {
    if (comment.replies.length > 0) return comment.replies;

    return comment;
  }

  const addComment = (text, replyingTo) => {
    createCommentApi(text, replyingTo).then(comment => {
      setComments([...comments, comment]);
    })
  }

  const deleteComment = (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteCommentApi(id).then(() => {
        const updatedComments = comments.filter(comment => {
          if (comment.id !== id) {
            const updatedReplies = comment.replies.filter(reply => {
              return reply.id !== id;
            });

            comment.replies = updatedReplies;
          }

          return comment.id !== id;
        });
        
        setComments(updatedComments);
      })
    }
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
            currentUsername={currentUsername}
            deleteComment={deleteComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
          />
        ))}
      </ul>

      <CommentForm submitLabel="Send" handleSubmit={addComment} />
    </>
  );
}

export default Comments;
