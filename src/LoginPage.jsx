import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; 
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("Admin");
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Ensures the video reloads properly
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const loginField = isEmail(email) ? { email } : { phoneNumber: email };
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
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
    setUserRole(role);
  };

  return (
    <div className="container">
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-clip"
      >
        <source src="video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.card}>
        <h1 className={styles.title}>Log In</h1>
        <p className={styles.subtitle}>Please enter your credentials.</p>
        <form onSubmit={handleLogin} className={styles.form}>
          <input
            type="email"
            placeholder="Your email"
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            required
          />
          <div className={styles.roleSelection}>
            <label>
              <input
                className={styles.choice}
                type="radio"
                value="Admin"
                checked={userRole === "Admin"}
                onChange={() => handleRoleChange("Admin")}
              />
              Admin
            </label>
            <label>
              <input
                className={styles.choice}
                type="radio"
                value="Clinic"
                checked={userRole === "Clinic"}
                onChange={() => handleRoleChange("Clinic")}
              />
              Clinic
            </label>
            <label>
              <input
                className={styles.choice}
                type="radio"
                value="Shelter"
                checked={userRole === "Shelter"}
                onChange={() => handleRoleChange("Shelter")}
              />
              Shelter
            </label>
          </div>
          <button
            type="submit"
            className={styles.button}
            onClick={() => navigate("/dashboard")}
          >
            Log In
          </button>
        </form>
        <p className={styles.footer}>
          Not with us?{" "}
          <span className={styles.link} onClick={() => navigate("/apply")}>
            Apply!
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
