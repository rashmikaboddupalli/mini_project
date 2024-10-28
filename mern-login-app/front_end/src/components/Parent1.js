// import React, { useState } from "react";
// import axios from "axios";
// import "./Parent.css"; // Assuming this is the CSS file for the Parent component

// const Parent1 = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [showAttendance, setShowAttendance] = useState(false);

//   const handleAttendanceClick = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/attendance");
//       setAttendanceData(response.data);
//       setShowAttendance(true);
//     } catch (error) {
//       console.error("Error fetching attendance data:", error);
//     }
//   };

//   return (
//     <div className="parent-container">
//       <div className="left-half">
//         <div className="button-container">
//           <button onClick={handleAttendanceClick}>ATTENDANCE</button>
//           <button>ACADEMICS</button>
//           <button>EXTRACURRICULAR</button>
//           <button>PLACEMENTS</button>
//           <button>OTHER ACHIEVEMENTS</button>
//           <button>OVERALL RANKING</button>
//           <button>ALL DETAILS</button>
//         </div>
//       </div>

//       <div className="right-half">
//         {showAttendance && (
//           <div className="attendance-list">
//             <h3>Attendance Records</h3>
//             <ul>
//               {attendanceData.map((record, index) => (
//                 <li key={index}>
//                   Roll Number: {record.rollno}, Percentage: {record.per}, Info:{" "}
//                   {record.info}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {!showAttendance && <h3>Select a button to view details</h3>}
//       </div>
//     </div>
//   );
// };

// export default Parent1;
