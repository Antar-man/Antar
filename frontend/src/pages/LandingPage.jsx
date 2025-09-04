import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function LandingPage() {
  return (
    <div className="container">
      <h1>Welcome to My App</h1>
      <p>Explore features after logging in</p>
      <div className="links">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
