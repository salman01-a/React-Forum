import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  function onSubmitHandler(event) {
    event.preventDefault();
    addThread({ title, body, category });
  }

  return (
    <form className="thread-input" onSubmit={onSubmitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <input type="text" value={title} onChange={onTitleChange} placeholder="Judul Thread" required style={{ padding: '12px', borderRadius: '8px' }} />
      <input type="text" value={category} onChange={onCategoryChange} placeholder="Kategori (opsional)" style={{ padding: '12px', borderRadius: '8px' }} />
      <textarea value={body} onChange={onBodyChange} placeholder="Tulis masalah atau diskusimu di sini..." required rows="6" style={{ padding: '12px', borderRadius: '8px' }} />
      <button type="submit" style={{ padding: '12px', backgroundColor: 'var(--secondary-color)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                Buat Thread
      </button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;