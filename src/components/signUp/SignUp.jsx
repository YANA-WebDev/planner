import React, { useState } from "react";
import "./signUp.css";

const SignUp = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => {
    setShowSignUp(true);
  };

  return (
    <>
      {!showSignUp && (
        <button className="signin-button" onClick={toggleSignUp}>
          Sign in
        </button>
      )}

      {showSignUp && (
        <div className="signup-container">
          <div className="signup-box">
            <image
              src="./images/doit-watch-logo.png"
              alt="Logo"
              className="logo"
            />
            <div className="form-container">
              <h2 className="form-title">Create Account</h2>
              <form>
                <input
                  type="text"
                  placeholder="User Name"
                  className="form-input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="form-input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="form-input"
                />
                <button className="signup-button">Sign up</button>
              </form>
              <div className="or-divider">
                <span>or</span>
              </div>
              <button className="google-signup">
                <img
                  src="./images/google.png"
                  alt="Google logo"
                  className="google-icon"
                />
              </button>
              <p className="login-text">
                Already have an account?{" "}
                <a href="#" className="login-link">
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
