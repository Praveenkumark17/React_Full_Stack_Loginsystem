import React from 'react';
import '../Css/ErrorPage.css'; // Import your CSS file

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-code">401</h1>
      <p className="error-message">Unauthorized: Access is denied due to invalid credentials.</p>
    </div>
  );
};

export default ErrorPage;