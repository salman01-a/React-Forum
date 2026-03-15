import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function onSubmitHandler(event) {
    event.preventDefault();
    register({ name, email, password });
  }

  return (
    <form className="register-input" onSubmit={onSubmitHandler}>
      <input
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="Nama Lengkap"
        required
      />
      <input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Password (minimal 6 karakter)"
        required
        minLength={6}
      />
      <button type="submit">Daftar</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;