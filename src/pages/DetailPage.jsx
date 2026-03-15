import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import { asyncReceiveThreadDetail, asyncAddComment } from '../states/threadDetail/action';
import CommentInput from '../components/commenInput';
import { showFormattedDate } from '../utils/utils';
function DetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onCommentSubmit = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  if (!threadDetail) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading detail thread...</p>;
  }

  return (
    <section className="detail-page" style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>

      <div className="thread-detail" style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)' }}>
        <header>
          <span className="category-badge" style={{ display: 'inline-block', padding: '4px 8px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginBottom: '8px', fontSize: '0.8rem' }}>
            #{threadDetail.category}
          </span>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>{threadDetail.title}</h2>

          <div className="thread-detail__user-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={threadDetail.owner.avatar} alt={threadDetail.owner.name} width="40" style={{ borderRadius: '50%' }} />
            <div>
              <p style={{ margin: 0 }}><strong>{threadDetail.owner.name}</strong></p>
              <p style={{ margin: 0, color: 'gray', fontSize: '0.85rem' }}>{showFormattedDate(threadDetail.createdAt)}</p>
            </div>
          </div>
        </header>

        <article className="thread-detail__body" style={{ marginTop: '24px', lineHeight: '1.6', fontSize: '1.1rem' }}>
          {parse(threadDetail.body)}
        </article>
      </div>


      <div className="comments-section">
        <h3>Beri Komentar</h3>


        {authUser ? (
          <CommentInput addComment={onCommentSubmit} />
        ) : (
          <p style={{ marginTop: '16px', color: 'gray' }}>
            <Link to="/login">Login</Link> dulu yuk buat ninggalin komentar!
          </p>
        )}

        <h3 style={{ marginTop: '32px' }}>Komentar ({threadDetail.comments.length})</h3>

        <div className="comments-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          {threadDetail.comments.map((comment) => (
            <div key={comment.id} className="comment-item" style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
              <header className="comment-item__header" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <img src={comment.owner.avatar} alt={comment.owner.name} width="24" style={{ borderRadius: '50%' }} />
                <p><strong>{comment.owner.name}</strong> • {showFormattedDate(comment.createdAt)}</p>
              </header>
              <div className="comment-item__content">
                {parse(comment.content)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DetailPage;