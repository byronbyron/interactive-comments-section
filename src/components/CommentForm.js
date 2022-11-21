import data from '../data.json';
import { useState } from 'react';

function CommentForm({
  handleSubmit,
  submitLabel,
  replyId,
  hasCancelButton = false,
  initialText = '',
  handleCancel
}) {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text, replyId);
    setText('');
  }

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Add a comment..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>

        <div className="form-footer">
          <div>
            <img src={data.currentUser.image.png} alt={data.currentUser.username} />
          </div>

          <button className="btn-primary" disabled={isTextareaDisabled}>{submitLabel}</button>

          
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
