import Score from '../Score.js';
import CommentForm from './CommentForm.js';

function Comment({
  comment,
  replies,
  currentUsername,
  deleteComment,
  updateComment,
  activeComment,
  setActiveComment,
  addComment,
  parentId = null,
}) {
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canReply = currentUsername !== comment.user.username;
  const canEdit = currentUsername === comment.user.username && !timePassed;
  const canDelete = currentUsername === comment.user.username && !timePassed;
  const isReplying =
    activeComment &&
    activeComment.type === 'replying' &&
    activeComment.id === comment.id;
  const isEditing =
    activeComment &&
    activeComment.type === 'editing' &&
    activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id;

  return (
    <li>
      <div className="comment">
        <Score commentScore={comment.score} />

        <div>
          <div className="comment-head">
            <img src={comment.user.image.png} alt="" />
            <span className="comment-name">{comment.user.username}</span>
            <span className="comment-time">{comment.createdAt}</span>
          </div>

          <div className="comment-content">
            {!isEditing && <p>{comment.content}</p>}
            {isEditing && (
              <CommentForm
                submitLabel="Update"
                hasCancelButton
                initialText={comment.content}
                handleSubmit={(text) => updateComment(text, comment.id)}
                handleCancel={() => setActiveComment(null)}
              />
            )}
          </div>
        </div>

        <div className="comment-actions">
          {canReply && (
            <button
              className="reply"
              type="button"
              onClick={() => setActiveComment({ id: comment.id, type: 'replying' })}
            >
              <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="currentColor"/></svg><span>Reply</span>
            </button>
          )}

          {canDelete && (
            <button
              className="delete"
              type="button"
              onClick={() => deleteComment(comment.id)}
            >
              <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="currentColor"/></svg><span>Delete</span>
            </button>
          )}

          {canEdit && (
            <button
              className="edit"
              type="button"
              onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}
            >
              <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="currentColor"/></svg><span>Edit</span>
            </button>
          )}
        </div>
      </div>

      {isReplying && (
        <CommentForm
          submitLabel="Reply"
          replyId={replyId}
          handleSubmit={(text, replyId) => addComment(text, replyId)}
        />
      )}

      {replies.length > 0 && (
        <ul>
          {replies.map(reply => (
            <Comment
              comment={reply}
              key={reply.id}
              replies={[]}
              currentUsername={currentUsername}
              deleteComment={deleteComment}
              updateComment={updateComment}
              addComment={addComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              parentId={comment.id}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Comment;
