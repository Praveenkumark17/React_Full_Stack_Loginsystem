import React from "react";
import "../Css/ErrorPage.css";

const ErrorPage = (props) => {
  return (
    <div className="error-page">
      <h1 className="error-code">ERROR: 401</h1>
      <p className="error-message">Unauthorized: {props.error?props.error:"Access Denied to Reset the Password"}</p>
    </div>
  );
};

export default ErrorPage;
