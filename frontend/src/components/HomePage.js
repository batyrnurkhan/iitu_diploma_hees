import React from 'react';
import logo from '../img/logo.png'


const HomePage = () => {
  return (
    <div className="home-page">
      <header className="header">
        <img src={logo} alt="Company Logo" className="logo"/>
        <h1>Welcome to Our Recruiting Platform</h1>
        <button className="sign-in-button">Sign In</button>
      </header>
      <p>We are dedicated to helping you find the right talent for your organization. Our platform connects you with top candidates in your industry, saving you time and resources in your recruitment process.</p>
      <p>Whether you are looking to fill a single position or build a team, we have the tools and expertise to help you succeed.</p>
    </div>
  );
};

export default HomePage;