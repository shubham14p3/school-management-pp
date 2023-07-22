import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./component/LoginForm";
import AdminDashboard from "./component/AdminDashboard";
import TeachingStaffDashboard from "./component/TeachingStaffDashboard";
import StudentDashboard from "./component/StudentDashboard";
import AddStudentForm from "./component/AddStudentForm";
import ViewStudents from "./component/ViewStudents";
import StudentNotice from "./component/StudentNotice";
import TeacherNotice from "./component/TeacherNotice";
import LeaveManagement from "./component/LeaveManagement";
import TaskManagement from "./component/TaskManagement";
import LogoutModal from "./component/LogoutModal";
import studentsData from "./data/students.json";
import studentNoticesData from "./data/studentNotices.json";
import teacherNoticesData from "./data/teacherNotices.json";
import adminsData from "./data/admins.json";
import teachingStaffData from "./data/teachingStaff.json";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(""); // To store the user type after login
  const [students, setStudents] = useState(studentsData);
  const [studentNotices, setStudentNotices] = useState(studentNoticesData);
  const [teacherNotices, setTeacherNotices] = useState(teacherNoticesData);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const admins = adminsData; // Get admins data from the imported file
  const teachingStaff = teachingStaffData; // Get teaching staff data from the imported file

  const handleLogin = (username, password) => {
    // Check if the user exists in the admins.json file
    const adminUser = admins.find(
      (user) => user.username === username && user.password === password
    );
    if (adminUser) {
      setLoggedIn(true);
      setUserType(adminUser.role); // Set the user type after successful login
      return;
    }

    // Check if the user exists in the teachingStaff.json file
    const staffUser = teachingStaff.find(
      (user) => user.username === username && user.password === password
    );
    if (staffUser) {
      setLoggedIn(true);
      setUserType(staffUser.role); // Set the user type after successful login
      return;
    }

    // Check if the user exists in the students.json file
    const studentUser = students.find(
      (user) => user.username === username && user.password === password
    );
    if (studentUser) {
      setLoggedIn(true);
      setUserType(studentUser.role); // Set the user type after successful login
      return;
    }

    // Handle invalid credentials
    setModalTitle("Warning");
    setModalMessage("Invalid credentials. Please try again.");
    setShowModal(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserType("");
    setModalTitle("Logout");
    setModalMessage("Logout successful.");
    setShowModal(true);
  };

  const handleAddStudent = (newStudent) => {
    // Assign a unique ID to the new student
    newStudent.id = Date.now();
    setStudents([...students, newStudent]); // Add the new student to the list
    setModalTitle("Success");
    setModalMessage("Student added successfully.");
    setShowModal(true);
  };
  const handleEditStudent = (studentId, updatedData) => {
    setStudents((prevStudents) => {
      return prevStudents.map((student) =>
        student.id === studentId ? { ...student, ...updatedData } : student
      );
    });
  };

  // Delete student
  const handleDeleteStudent = (studentId) => {
    setStudents((prevStudents) => {
      return prevStudents.filter((student) => student.id !== studentId);
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginForm handleLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            loggedIn ? (
              userType === "admin" ? (
                <AdminDashboard
                  handleLogout={handleLogout}
                  userType={userType}
                />
              ) : userType === "teachingStaff" ? (
                <TeachingStaffDashboard
                  handleLogout={handleLogout}
                  userType={userType}
                />
              ) : userType === "student" ? (
                <StudentDashboard
                  handleLogout={handleLogout}
                  userType={userType}
                />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Route for viewing students */}
        <Route
          path="/view-students"
          element={
            <ViewStudents
              students={students}
              handleEditStudent={handleEditStudent}
              handleDeleteStudent={handleDeleteStudent}
            />
          }
          when={loggedIn && userType === "admin"}
        />

        {/* Route for adding a student */}
        {/* <Route
          path="/add-student"
          element={
            <AddStudentForm students={students} setStudents={setStudents} />
          }
          when={loggedIn && userType === "admin"}
        /> */}
        <Route
          path="/add-student"
          element={<AddStudentForm handleAddStudent={handleAddStudent} />}
          when={loggedIn && userType === "admin"}
        />
        {/* Route for viewing student notices */}
        <Route
          path="/student-notice"
          element={<StudentNotice studentNotices={studentNotices} />}
          when={loggedIn && userType === "student"}
        />

        {/* Route for viewing teacher notices */}
        <Route
          path="/teacher-notice"
          element={<TeacherNotice teacherNotices={teacherNotices} />}
          when={loggedIn && userType === "teachingStaff"}
        />

        {/* Route for leave management */}
        <Route
          path="/leave-management"
          element={<LeaveManagement />}
          when={loggedIn && userType === "teachingStaff"}
        />

        {/* Route for task management */}
        <Route
          path="/task-management"
          element={<TaskManagement />}
          when={loggedIn && userType === "teachingStaff"}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {showModal && (
        <LogoutModal
          showModal={showModal}
          setShowModal={setShowModal}
          title={modalTitle}
          message={modalMessage}
        />
      )}
    </Router>
  );
};

export default App;
