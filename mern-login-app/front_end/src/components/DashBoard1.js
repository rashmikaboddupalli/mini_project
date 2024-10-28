import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import StudentList from "./StudentList";
import StudentDetails from "./StudentDetails";
import AddStudentForm from "./AddStudentForm";
import "./Teacherapp.css"; // Ensure the path is correct

function DashBoard1() {
  const navigate = useNavigate(); // Create navigate function
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [announcementText, setAnnouncementText] = useState("");
  const [announcements, setAnnouncements] = useState([]); // State to hold announcements
  const [showAnnouncementsSection, setShowAnnouncementsSection] =
    useState(false); // State to control visibility of announcements section

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
      setShowAnnouncementsSection(false); // Hide announcements section when fetching students
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/announcements"
      );
      setAnnouncements(response.data); // Update announcements state with fetched data
      setShowAnnouncementsSection(true); // Show announcements section after fetching
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const addStudent = async (student) => {
    await axios.post("http://localhost:5000/students", student);
    fetchStudents();
    setShowAddStudentForm(false);
  };

  const addAnnouncement = async () => {
    try {
      const response = await axios.post("http://localhost:5000/announcement", {
        info: announcementText,
      });
      console.log("Announcement added:", response.data);
      setAnnouncementText("");
      setShowAnnouncementForm(false); // Hide form after adding announcement
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/students/${id}`);
      fetchStudents(); // Fetch updated student list after deletion
    } catch (error) {
      console.error("Error deleting student:", error.response.data);
    }
  };

  const deleteAnnouncement = async (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        await axios.delete(`http://localhost:5000/announcements/${id}`);
        fetchAnnouncements(); // Refresh announcements after deletion
      } catch (error) {
        console.error("Error deleting announcement:", error);
        alert("Failed to delete the announcement. Please try again."); // Error feedback
      }
    }
  };

  const handleAddStudentClick = () => {
    setShowAddStudentForm(true);
    setSelectedStudent(null);
    setShowAnnouncementForm(false); // Hide other forms
  };

  const handleAddAnnouncementClick = () => {
    setShowAnnouncementForm(true);
    setShowAddStudentForm(false);
    setSelectedStudent(null); // Clear selected student
  };

  const handleFetchAnnouncementsClick = () => {
    if (showAnnouncementsSection) {
      setShowAnnouncementsSection(false); // Hide announcements if already visible
    } else {
      fetchAnnouncements(); // Fetch announcements when the button is clicked
    }
  };

  const handleAddTeacherClick = () => {
    navigate("/teacher-register"); // Redirect to teacher registration page
  };

  const handleAddParentClick = () => {
    navigate("/parent-register"); // Redirect to parent registration page
  };

  const handleStudentClick = async (id) => {
    const response = await axios.get(`http://localhost:5000/students/${id}`);
    setSelectedStudent(response.data);
    setShowAddStudentForm(false);
    setShowAnnouncementForm(false);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <button className="sidebar-button" onClick={handleAddStudentClick}>
          + Add Student
        </button>
        <button className="sidebar-button" onClick={handleAddTeacherClick}>
          + Add Teacher
        </button>
        <button className="sidebar-button" onClick={handleAddParentClick}>
          + Add Parent
        </button>
        <button className="sidebar-button" onClick={handleAddAnnouncementClick}>
          + Add Announcement
        </button>
        <button
          className="sidebar-button"
          onClick={handleFetchAnnouncementsClick}
        >
          Fetch Announcements
        </button>
        <div className="chatbox">Chat Box</div>
      </div>
      <div className="main-content">
        <input
          type="text"
          placeholder="Search for students..."
          onChange={(e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredStudents = students.filter((student) =>
              student.name.toLowerCase().includes(searchTerm)
            );
            setStudents(filteredStudents);
          }}
          className="search-box"
        />
        <StudentList
          students={students}
          setSelectedStudent={handleStudentClick}
          deleteStudent={deleteStudent}
        />
        <div className="display-section">
          {showAddStudentForm ? (
            <AddStudentForm addStudent={addStudent} />
          ) : showAnnouncementForm ? (
            <div className="announcement-form">
              <h3>Add Announcement</h3>
              <textarea
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="Enter announcement text"
              />
              <button onClick={addAnnouncement}>Submit Announcement</button>
            </div>
          ) : (
            selectedStudent && (
              <StudentDetails
                student={selectedStudent}
                fetchStudents={fetchStudents}
              />
            )
          )}
        </div>
        {showAnnouncementsSection && ( // Conditionally render the announcements section
          <div className="announcement-section">
            <h3>Announcements</h3>
            <ul>
              {announcements.map((announcement) => (
                <li key={announcement._id}>
                  {announcement.info}
                  <button onClick={() => deleteAnnouncement(announcement._id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashBoard1;
