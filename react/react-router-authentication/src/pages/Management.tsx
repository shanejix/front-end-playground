import React from 'react';
import { Link } from 'react-router-dom';

function Management() {
  return (
    <>
      <h1>this is private management page</h1>
      <Link to="/">back to home</Link>
    </>
  );
}

export default Management;