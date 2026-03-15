import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/loginInput';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <section className="login-page">
      <header className="login-page__hero">
        <h1>Yuk, Login Dulu!</h1>
      </header>
      <article className="login-page__main">
        <h2>Silakan masuk untuk mulai berdiskusi.</h2>

        <LoginInput login={onLogin} />

        <p>
          Belum punya akun? <Link to="/register">Daftar di sini.</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;