import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DashBoard.css"; // Import the CSS file

const DashBoard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showAcademicDetails, setShowAcademicDetails] = useState(false);
  const [announcements, setAnnouncements] = useState([]); // State to hold announcements

  useEffect(() => {
    const fetchStudentsByParentEmail = async () => {
      const parentEmail = localStorage.getItem("parentEmail");
      if (parentEmail) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/students/parent/${parentEmail}`
          );
          setStudents(response.data);
          if (response.data.length > 0) {
            setSelectedStudent(response.data[0]);
          }
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      }
    };

    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/announcements"
        );
        setAnnouncements(response.data); // Set announcements fetched from the database
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchStudentsByParentEmail();
    fetchAnnouncements(); // Call fetchAnnouncements on component mount
  }, []);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setShowAttendance(false);
    setShowAcademicDetails(false);
  };

  const handleAttendanceClick = () => {
    setShowAttendance((prev) => !prev);
    setShowAcademicDetails(false);
  };

  const handleAcademicDetailsClick = () => {
    setShowAcademicDetails((prev) => !prev);
    setShowAttendance(false);
  };

  return (
    <div className="container">
      <div className="announcement-box">
        <h2>Welcome, Parent!</h2>
        <p>Announcements:</p>
        <div className="announcement-text">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div key={announcement._id}>{announcement.info}</div> // Display each announcement in a new line
            ))
          ) : (
            <p>No announcements available.</p>
          )}
        </div>
      </div>

      <div className="bottom-content">
        <div className="left-half">
          <button className="button" onClick={handleAttendanceClick}>
            Attendance
          </button>
          <button className="button" onClick={handleAcademicDetailsClick}>
            Academic Details
          </button>
          <button
            className="button"
            onClick={() => alert("Extracurricular clicked")}
          >
            Extracurricular
          </button>
          <button className="button" onClick={() => alert("Chatbox clicked")}>
            Chatbox
          </button>
        </div>

        <div className="right-half">
          <div className="display">
            <h3>Student Information</h3>
            {selectedStudent ? (
              <div>
                {showAttendance ? (
                  <>
                    <p>Attendance: {selectedStudent.attendance}</p>
                    <p>Attendance Details: {selectedStudent.attendance_info}</p>
                  </>
                ) : showAcademicDetails ? (
                  <>
                    <p>Overall Ranking: {selectedStudent.overall_ranking}</p>
                    <p>
                      Mathematics Marks: {selectedStudent.mathematics_marks}
                    </p>
                    <p>Physics Marks: {selectedStudent.physics_marks}</p>
                    <p>Chemistry Marks: {selectedStudent.chemistry_marks}</p>
                    <p>Social Marks: {selectedStudent.social_marks}</p>
                    <p>English Marks: {selectedStudent.english_marks}</p>
                  </>
                ) : (
                  <>
                    <p>Roll Number: {selectedStudent.rollno}</p>
                    <p>Name: {selectedStudent.name}</p>
                    <p>Class: {selectedStudent.class}</p>
                    <p>Parent Email: {selectedStudent.parent_email}</p>
                  </>
                )}
              </div>
            ) : (
              <p>Select a student to view details</p>
            )}
          </div>

          <h4>Student List with the same parent_email</h4>
          <ul>
            {students.map((student) => (
              <li key={student._id}>
                <button
                  className="student-button"
                  onClick={() => handleStudentSelect(student)}
                >
                  {student.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
