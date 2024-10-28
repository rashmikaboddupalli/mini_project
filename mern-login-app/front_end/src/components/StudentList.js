// StudentList.js
import React from "react";

function StudentList({ students, setSelectedStudent, deleteStudent }) {
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmDelete) {
      deleteStudent(id);
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students available.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              <span
                onClick={() => setSelectedStudent(student._id)}
                style={{ cursor: "pointer", fontWeight: "bold" }}
              >
                {student.name}
              </span>
              <button
                onClick={() => handleDelete(student._id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;
