import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function CommentInput({ addComment }) {
  const [content, onContentChange, setContent] = useInput('');

  function onSubmitHandler(event) {
    event.preventDefault();
    if (content.trim()) {
      addComment(content);
      setContent('');
    }
  }

  return (
    <form className="comment-input" onSubmit={onSubmitHandler}>
      <textarea
        value={content}
        onChange={onContentChange}
        placeholder="Tulis komentarmu di sini..."
        required
        rows="4"
        style={{ width: '100%', padding: '12px', borderRadius: '8px', marginTop: '16px' }}
      />
      <button type="submit" style={{ marginTop: '8px', padding: '8px 16px', cursor: 'pointer' }}>
                Kirim Komentar
      </button>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;