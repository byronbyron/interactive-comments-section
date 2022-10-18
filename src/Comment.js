import Reply from './Reply.js';
import Score from './Score.js';

function Comment({comment}) {
  return (
    <li>
      <div className="comment">
        <Score score={comment.score} />

        <div>
          <p>
            <img src={comment.user.image.png} alt="" />
            <strong>{comment.user.username}</strong>
            <span>{comment.createdAt}</span>
          </p>

          <p>{comment.content}</p>
        </div>
      </div>
      
      {comment.replies.map(reply =>
        <Reply key={reply.id} reply={reply} />
      )}
    </li>
  );
}

export default Comment;
