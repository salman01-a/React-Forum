import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { showFormattedDate } from '../utils/utils';

function ThreadItem({ id, title, body, category, createdAt, totalComments, user }) {
  return (
    <div className="thread-item">
      <div className="thread-item__header-wrapper">
        {category && (
          <span style={{ display: 'inline-block', padding: '4px 8px', backgroundColor: '#e2e8f0', borderRadius: '4px', marginBottom: '8px', fontSize: '0.75rem', fontWeight: 'bold' }}>
             #{category}
          </span>
        )}
        <h3 className="thread-item__title">
          <Link to={`/threads/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {title}
          </Link>
        </h3>
      </div>

      <div className="thread-item__body">
        {parse(body)}
      </div>

      <div className="thread-item__footer-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
        <div className="thread-item__user-info" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)' }}>
          <img src={user.avatar} alt={user.name} width="28" height="28" style={{ borderRadius: '50%' }} />
          <span><strong>{user.name}</strong></span>
        </div>

        <div className="thread-item__stats">
          <span style={{ marginRight: '16px' }}>{showFormattedDate(createdAt)}</span>
          <span>💬 {totalComments} Komentar</span>
        </div>
      </div>
    </div>
  );
}


ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default ThreadItem;