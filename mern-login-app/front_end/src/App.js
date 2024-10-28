import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import TeacherLogin from "./components/TeacherLogin";
import ParentLogin from "./components/ParentLogin";
import ParentRegister from "./components/ParentRegister";
import TeacherRegister from "./components/TeacherRegister";
import Dashboard from "./components/DashBoard"; // Import the Dashboard component
import Dashboard1 from "./components/DashBoard1";

import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import AddStudentForm from "./components/AddStudentForm";
import StudentDetails from "./components/StudentDetails";
import StudentList from "./components/StudentList";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/parent-login" element={<ParentLogin />} />
          <Route path="/parent-register" element={<ParentRegister />} />
          <Route path="/teacher-register" element={<TeacherRegister />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />{" "}
          {/* Protected Route */}
          <Route
            path="/dashboard1"
            element={<ProtectedRoute element={<Dashboard1 />} />}
          />{" "}
          {/* Protected Route */}
          <Route path="/addStudent" element={AddStudentForm}/>
          <Route path="/studentdetails" element={StudentDetails}/>
          <Route path="/studentlist" element={StudentList}/>

        </Routes>
      </div>
    </Router>
  );
};

export default App;
