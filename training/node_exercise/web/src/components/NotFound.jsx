import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="text-center">
    <h1>Page not found!</h1>
    <Link to="/"><p>Return Home</p></Link>
  </div>
);

export default NotFound;
