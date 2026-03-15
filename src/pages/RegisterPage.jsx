import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/user/action';
import RegisterInput from '../components/registerInput';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ email, name, password }))
      .then(() => {
        navigate('/login');
      })
      .catch(() => {

      });
  };

  return (
    <section className="register-page">
      <header className="register-page__hero">
        <h1>Buat Akun Baru</h1>
      </header>
      <article className="register-page__main">
        <h2>Daftar untuk ikut berdiskusi.</h2>

        <RegisterInput register={onRegister} />

        <p>
          Sudah punya akun? <Link to="/login">Login di sini.</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;