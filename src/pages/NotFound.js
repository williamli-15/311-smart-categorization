import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

/**
 * This is rendered when a route is not found (404).
 */
const NotFound = () => (
  <div className="NotFound">
    <h1>404</h1>
    <h3>The page you were looking for is not here.</h3>
    <Link to="/">Go Home</Link>
  </div>
);

export default NotFound;
