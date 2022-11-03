import data from './data.json';
import Comments from './components/Comments.js';
import Score from './Score.js';

function App() {
  return (
    <div className="container">
      <Comments currentUserId="1" />

      <form className="form">
        <div className="form-group">
          <textarea className="form-control" placeholder="Add a comment..."></textarea>
        </div>

        <div className="form-footer">
          <div>
            <img src={data.currentUser.image.png} alt={data.currentUser.username} />
          </div>

          <button className="btn-primary">Send</button>
        </div>
      </form>
    </div>
  );
}

export default App;
