import React, { useState } from "react";
import axios from "axios";

const TeacherRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/teacher/register",
        {
          email,
          password,
        }
      );
      console.log(response); // Log the response object
      if (response.data) {
        setMessage("Registration successful!");
      } else {
        setMessage("No data found in response.");
      }
    } catch (error) {
      console.error(error); // Log the error
      setMessage(
        "Registration failed: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  return (
    <div>
      <h2>TEACHER REGISTRATION</h2>
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
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TeacherRegister;
