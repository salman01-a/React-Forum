import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import ThreadList from '../components/threadList';

function HomePage() {
  const dispatch = useDispatch();

  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  return (
    <section className="home-page" style={{ padding: '16px' }}>

      <Helmet>
        <title>Beranda - Forum App</title>
      </Helmet>

      <h2>Diskusi Tersedia</h2>

      <ThreadList threads={threadList} />

      {authUser && (
        <Link to="/new" style={{
          position: 'fixed',
          bottom: '80px',
          right: '32px',
          backgroundColor: '#0f172a',
          color: 'white',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '32px',
          textDecoration: 'none',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          zIndex: 99
        }}>
          +
        </Link>
      )}
    </section>
  );
}

export default HomePage;