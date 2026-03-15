import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBar from '@dimasmds/react-redux-loading-bar';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Footer from './components/footer';
import DetailPage from './pages/DetailPage';
import AddThreadPage from './pages/AddThreadPage';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());

  };

  if (isPreload) {
    return null;
  }

  return (
    <div className="app-container">
      <header>
        <LoadingBar />
        <div className="top-bar">
          <h1>Forum App</h1>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* <Route path="/leaderboards" element={<LeaderboardPage />} /> */}
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/new" element={<AddThreadPage />} />
        </Routes>
      </main>

      <Footer authUser={authUser} logOut={onSignOut} />
    </div>
  );
}

export default App;