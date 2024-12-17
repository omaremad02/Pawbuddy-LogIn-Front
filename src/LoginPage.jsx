import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; 
import axios from 'axios';
import { ADMIN_LOGIN } from './remote_source/remote_source';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Admin');
  const isEmail = (value) => /\S+@\S+\.\S+/.test(value);

  if (!role) {
    alert('Please select a role before logging in.');
    return;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginField = isEmail(email) ? { email } : { phoneNumber: email };
    try {
      console.log('//////');
      
      const response = await axios.post(ADMIN_LOGIN, {
        ...loginField,
        password,
        role,
      });

      console.log('Login Successful:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login Failed:', error.response?.data || error.message);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  const handleRoleChange = (role) => {
    setRole(role);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Log In</h1>
        <p className={styles.subtitle}>
          Please enter your credentials.
        </p>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="text"
            placeholder="Email or Phone Number"
            className={styles.input}
            value={email}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className={styles.roleSelection}>
            <label>
              <input
                className={styles.choice}
                type="radio"
                value="Admin"
                checked={role === 'Admin'}
                onChange={(e) => handleRoleChange(e.target.value)}
              />
              Admin
            </label>
            <label>
              <input
                className={styles.choice}
                type="radio"
                value="Clinic"
                checked={role === 'Clinic'}
                onChange={(e) => handleRoleChange(e.target.value)}
              />
              Clinic
            </label>
            <label>
              <input
                className={styles.choice}
                type="radio"
                value="Shelter"
                checked={role === 'Shelter'}
                onChange={(e) => handleRoleChange(e.target.value)}
              />
              Shelter
            </label>
          </div>
          <button type="submit" className={styles.button}>
            Log In
          </button>
        </form>
        <p className={styles.footer}>
          Not with us?{' '}
          <span className={styles.link} onClick={() => navigate('/apply')}>
            Apply!
          </span>
        </p>
      </div>
    </div>
    
  );
  
};

export default LoginPage;
