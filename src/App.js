import Comments from './components/Comments.js';
import data from './data.json';

function App() {
  return (
    <div className="container">
      <Comments currentUsername={data.currentUser.username} />
    </div>
  );
}

export default App;
