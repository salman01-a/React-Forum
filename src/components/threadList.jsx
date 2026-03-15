import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './threadsItem';

function ThreadList({ threads }) {
  return (
    <div className="threads-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '24px' }}>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ThreadList;