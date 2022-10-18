import Score from './Score.js';

function Reply({reply}) {
  return (
    <div className="comment reply">
      <Score score={reply.score} />

      <div>
        <p>
          <img src={reply.user.image.png} alt="" />
          <strong>{reply.user.username}</strong>
          <span>{reply.createdAt}</span>
        </p>

        <p>{reply.content}</p>
      </div>
    </div>
  );
}

export default Reply;
