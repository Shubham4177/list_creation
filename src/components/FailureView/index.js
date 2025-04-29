import React from 'react';
import './styles.css';

const FailureView = ({ onRetry }) => {
  return (
    <div>
      <p>Something went wrong.</p>
      <button onClick={onRetry}>Try Again</button>
    </div>
  );
};

export default FailureView;
