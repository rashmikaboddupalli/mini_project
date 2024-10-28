import React, { useState } from "react";
import axios from "axios";

function StudentDetails({ student, fetchStudents }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({
    name: student.name,
    class: student.class,
    parent_email: student.parent_email,
    rollno: student.rollno,
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/students/${student._id}`,
        updatedStudent
      );
      console.log("Update Response:", response.data);
      setIsEditing(false);
      fetchStudents(); // Refresh the student list
    } catch (error) {
      console.error(
        "Error updating student:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <h2>Edit Student</h2>
          <input
            type="text"
            name="name"
            value={updatedStudent.name}
            onChange={handleEditChange}
            placeholder="Student Name"
            required
          />
          <input
            type="text"
            name="class"
            value={updatedStudent.class}
            onChange={handleEditChange}
            placeholder="Class"
            required
          />
          <input
            type="email"
            name="parent_email"
            value={updatedStudent.parent_email}
            onChange={handleEditChange}
            placeholder="Parent Email"
            required
          />
          <input
            type="text"
            name="rollno"
            value={updatedStudent.rollno}
            onChange={handleEditChange}
            placeholder="Admission No"
            required
          />
          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{student.name}</h2>
          <p>Class: {student.class}</p>
          <p>Parent Email: {student.parent_email}</p>
          <p>Admission No: {student.rollno}</p>
          <button onClick={() => setIsEditing(true)}>Update</button>
        </div>
      )}
    </div>
  );
}

export default StudentDetails;
