import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>this home page</h1>
      <ul>
        <li><Link to="/login">login</Link></li>
        <li><Link to="/management">management</Link></li>
      </ul>
    </>
  );
}

export default Home;