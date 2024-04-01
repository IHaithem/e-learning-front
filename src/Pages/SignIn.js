import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'; // Import the CSS file

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/signin', {
        username: username,
        password: password,
      });

      if (response && response.data) {
        const role = response.data.role;
        const { token } = response.data;
        localStorage.setItem('jwt', token);


        if (role === 'ADMIN') {
          navigate('/adminHome');
        } else if (role === 'TEACHER') {
          navigate('/teacherHome',{ state: { username: username } });
        } else if (role === 'STUDENT') {
          navigate('/studentHome', { state: { username: username } });
        } else {
          setError('Invalid username or password');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <section id="section">
      <div id="form-box">
        <form onSubmit={handleSignIn}>
          <h2 id="heading">Login</h2>
          {error && <div className="error">{error}</div>}
          <div id="username-box">
            <ion-icon id="username-icon" name="person-outline"></ion-icon>
            <input
              type="username"
              name="username"
              id="username"
              required
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username" id="username-label">Username</label>
          </div>
          <div id="password-box">
            <ion-icon id="password-icon" name="lock-closed-outline"></ion-icon>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password" id="password-label">Password</label>
          </div>
          <button type="submit" id="submit-btn">Log in</button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
