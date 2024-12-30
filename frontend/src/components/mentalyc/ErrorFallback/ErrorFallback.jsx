import React from "react";
import "./fallback.scss";

const ErrorFallback = ({ error, componentStack, resetError }) => {
  return (
    <div className="error-container">
      <div className="error-message">
        You have encountered an unexpected error! Please contact the support team.
      </div>
    </div>
  );
};

export default ErrorFallback;
