import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const handleGoogleLoginSuccess = (response) => {
    // Handle successful Google login
    console.log('Google login successful:', response);
    // Perform any additional actions or redirect to another page
    if (onSuccess) {
      onSuccess(response);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    // Handle Google login failure or error
    console.error('Google login error:', error);
    // Display an error message or perform any other necessary actions
    if (onFailure) {
      onFailure(error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="268292480908-gog94fsda0jjsgrka5q8m0ur68qkrmj7.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
        buttonText="Login with Google"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;