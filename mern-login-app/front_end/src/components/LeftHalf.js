import React from "react";
import "./LeftHalf.css"; // Assuming this is the CSS for LeftHalf

const LeftHalf = () => {
  return (
    <div className="left-half">
      <div className="button-container">
        <button>ATTENDENCE</button>
        <button>ACADEMICS</button>
        <button>EXTRACURRICULAR</button>
        <button>PLACEMENTS</button>
        <button>OTHER ACHEIVEMENTS</button>
        <button>OVERALL RANKING</button>
      </div>
    </div>
  );
};

export default LeftHalf;
