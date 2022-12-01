import { useState, useEffect } from 'react';
import {
    getComments as getCommentsApi,
    createComment as createCommentApi,
    deleteComment as deleteCommentApi,
    updateComment as updateCommentApi,
} from '../api.js';
import Comment from './Comment.js';
import CommentForm from './CommentForm.js';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Comments({ currentUsername }) {
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const getReplies = comment => {
    if (comment.replies.length > 0) return comment.replies;

    return comment;
  }

  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then(comment => {
      setComments([...comments, comment]);
      setActiveComment(null);
    })
  }

  const deleteComment = (id) => {
    confirmAlert({
      title: "Delete comment",
      message: "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
      buttons: [
        {
          label: 'Yes, delete',
          onClick: () => actionDelete(id),
        },
        {
          label: 'No, cancel',
        }
      ]
    });
  }

  const actionDelete = (id) => {
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

  const updateComment = (text, commentId) => {
    updateCommentApi(text, commentId).then(() => {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return { ...comment, content: text };
        }

        return comment;
      });

      setComments(updatedComments);
      setActiveComment(null);
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
            currentUsername={currentUsername}
            deleteComment={deleteComment}
            updateComment={updateComment}
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
