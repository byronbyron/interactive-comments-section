import Score from '../Score.js';

function Comment({ comment, replies }) {
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
            <p>{comment.content}</p>
          </div>
        </div>
      </div>

      {replies.length > 0 && (
        <ul>
          {replies.map(reply => (
            <Comment comment={reply} key={reply.id} replies={[]} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Comment;
