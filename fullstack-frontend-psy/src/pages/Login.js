import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css'; // Import CSS module

const Login = ({ onLogin }) => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isCreatingAccount) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert("Account created successfully!");
      setIsCreatingAccount(false);
    } else {
      if (username === 'admin' && password === 'password') {
        onLogin();
        navigate('/');
      } else {
        alert("Invalid username or password!");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.box} ${
          isCreatingAccount ? styles['creating-account'] : ''
        }`}
      >
        <h2>{isCreatingAccount ? 'Create Account' : 'Login'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isCreatingAccount && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <button type="submit">
            {isCreatingAccount ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <button
          className={styles['toggle-button']}
          onClick={() => setIsCreatingAccount(!isCreatingAccount)}
        >
          {isCreatingAccount
            ? 'Already have an account?'
            : "Don't have an account?"}
        </button>
      </div>
    </div>
  );
};

export default Login;
