import React, { useState } from 'react';

function Login() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { value, type } }) => {
    setUserInfo({ ...userInfo, [type]: value });
  };

  const formValidation = () => {
    const minPassLength = 6;
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { email, password } = userInfo;

    return password.length > minPassLength && email.match(validEmail);
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  };

  return (
    <form>
      <input
        type="email"
        data-testid="email-input"
        value={ userInfo.email }
        onChange={ handleChange }
      />
      <input
        type="password"
        data-testid="password-input"
        value={ userInfo.password }
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !formValidation() }
        onClick={ handleClick }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
