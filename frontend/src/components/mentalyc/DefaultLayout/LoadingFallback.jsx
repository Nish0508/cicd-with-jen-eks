import React from "react";
import "./loadingFallback.scss";

const LoadingFallback = () => {
  return (
    <div className="fallback-container">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );
};

export default LoadingFallback;
