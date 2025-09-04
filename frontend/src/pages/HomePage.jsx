import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

export default function HomePage({ token, onLogout }) {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await axios.get('http://localhost:5000/home', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to fetch home data');
        navigate('/login');
      }
    };
    fetchHome();
  }, [token, navigate]);

  return (
    <div className="container">
      <h1>Home</h1>
      {user && <p>Welcome, {user.username}!</p>}
      {message && <p className="message">{message}</p>}
      <div className="links">
        <Link to="/growth">Growth</Link>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}
