import { useState } from "react";
import postSignup from "../api/post-signup.js";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

function SignupForm() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!credentials.username || !credentials.password) {
      setErrorMessage("Please fill in both username and password.");
      return;
    }

    try {
      const response = await postSignup(credentials.username, credentials.password);
      console.log("Signup Successful:", response);
      setSuccessMessage("🎉 Account created successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.log(error);
      setErrorMessage("❌ Signup failed. Username may already exist.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create an Account 🐾</h2>
        <p className="signup-subtitle">Join Treasure Bowl to help animals in need</p>

        {errorMessage && <p className="signup-error">{errorMessage}</p>}
        {successMessage && <p className="signup-success">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter a username"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter a password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
