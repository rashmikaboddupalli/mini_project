import React, { useState } from "react";
import api from "../axiosInstance"; // Import the Axios instance
import { useNavigate } from "react-router-dom";

const ParentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/login", {
        email,
        password,
      });
      console.log(response); // Log the response object

      if (response.data && response.data.token) {
        // Store the token and email in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("parentEmail", email); // Store the parent email

        setMessage("Login successful!");
        navigate("/dashboard");
      } else {
        setMessage("No data found in response.");
      }
    } catch (error) {
      console.error(error); // Log the error
      setMessage(
        "Login failed: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  return (
    <div>
      <h2>Parent Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ParentLogin;
