import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css'; // Import CSS module
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [loginRequest, setLoginRequest] = useState({
    username: '',
    password: ''
  });
  const [confirmPassowrd, setConfirmPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isCreatingAccount) {
      if (loginRequest.password !== confirmPassowrd) {
        alert("Passwords do not match!");
        return;
      }

      try{
        const response = await axios.post('http://localhost:8080/api/auth/create-user', {
          username: loginRequest.username,
          password: loginRequest.password,
          // No need to send `actions`, it will be handled by the backend
        });

      }catch(e){
        alert("error:" + e)
      }
      alert("Account created successfully!");
      setIsCreatingAccount(false);
    } else {
      
      try {

        const response = await axios.post('http://localhost:8080/api/auth/login', {
          username: loginRequest.username,
          password: loginRequest.password,
        });
    
        if (response.status === 200) {
          const token = response.headers['authorization'];
          if (token) {
            localStorage.setItem('authToken', token); // Store token
            onLogin();
            navigate('/');
          }
        }
      } catch (e) {
        if (e.response?.status === 401) {
          alert("Invalid username or password!");
        } else {
          alert("An error occurred during login.");
        }
      }
    }
  };

  console.log(isCreatingAccount)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginRequest((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputChange2 = (e) => {
    setConfirmPassword(e.target.value)
  }

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
            name="username"
            placeholder="Username"
            value={loginRequest.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginRequest.password}
            onChange={handleInputChange}
          />
          {isCreatingAccount && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassowrd}
              onChange={handleInputChange2}
            />
          )}
          <button type="submit" onClick={handleSubmit}>
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
