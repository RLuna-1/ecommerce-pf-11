import React from "react";

const GoogleLoginButton = ({ className, children }) => {
  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  return (
    <button className={className} onClick={handleGoogleSignIn}>
      {children}
    </button>
  );
};

export default GoogleLoginButton;
