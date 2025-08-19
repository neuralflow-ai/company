import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className="font-display text-2xl font-bold tracking-wider">
      <span className="text-white">Neural</span>
      <span className="text-accent-blue">Flow</span>
    </Link>
  );
};
