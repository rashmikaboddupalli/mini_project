import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Welcome to the Login Page</h1>
      <button onClick={() => navigate("/teacher-login")}>
        Login as Teacher
      </button>
      <button onClick={() => navigate("/parent-login")}>Login as Parent</button>
    </div>
  );
};

export default HomePage;
