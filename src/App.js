import data from './data.json';
import Score from './Score.js';

function App() {
  return (
    <div className="container">
      <ul>
        {data.comments.map(comment => 
          <li key={comment.id}>
            <div className="comment">
              <Score score={comment.score} />

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
            
            <ul>
              {comment.replies.map(reply => 
                <li key={reply.id}>
                  <div className="comment reply">
                    <Score score={reply.score} />

                    <div>
                      <div className="comment-head">
                        <img src={reply.user.image.png} alt="" />
                        <span className="comment-name">{reply.user.username}</span>
                        <span className="comment-time">{reply.createdAt}</span>
                      </div>

                      <div className="comment-content">
                        <p><span class="comment-reply-to">{`@${reply.replyingTo}`}</span> {reply.content}</p>
                      </div>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
