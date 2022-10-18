import Comment from './Comment.js';
import data from './data.json';

function CommentList() {
  return (
    <ul>
      {data.comments.map(comment =>
        <Comment key={comment.id} comment={comment} />
      )}
    </ul>
  );
}

export default CommentList;
