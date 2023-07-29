import React, { useState, useEffect } from "react";
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
import LogoutModalLogin from "./component/LogoutModalLogin";
import studentsData from "./data/students.json";
import studentNoticesData from "./data/studentNotices.json";
import teacherNoticesData from "./data/teacherNotices.json";
import adminsData from "./data/admins.json";
import teachingStaffData from "./data/teachingStaff.json";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState(
    localStorage.getItem("userType") || ""
  ); // To store the user type after login, get from localStorage

  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students")) || studentsData
  );
  const [admins, setadmins] = useState(
    JSON.parse(localStorage.getItem("admins")) || adminsData
  );
  const [teachingStaff, setTeachingStaff] = useState(
    JSON.parse(localStorage.getItem("teachingStaff")) || teachingStaffData
  );
  const [studentNotices, setStudentNotices] = useState(
    JSON.parse(localStorage.getItem("studentNotices")) || studentNoticesData
  );
  const [teacherNotices, setTeacherNotices] = useState(
    JSON.parse(localStorage.getItem("teacherNotices")) || teacherNoticesData
  );
  const [showModal, setShowModal] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    // When the component mounts, check if userType is present in localStorage and set it in state
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType);
      setLoggedIn(true);
    }
  }, []);

  // Update localStorage when data changes
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem("admins", JSON.stringify(admins));
  }, [admins]);

  useEffect(() => {
    localStorage.setItem("teachingStaff", JSON.stringify(teachingStaff));
  }, [teachingStaff]);

  useEffect(() => {
    localStorage.setItem("studentNotices", JSON.stringify(studentNotices));
  }, [studentNotices]);

  useEffect(() => {
    localStorage.setItem("teacherNotices", JSON.stringify(teacherNotices));
  }, [teacherNotices]);

  const handleLogin = (username, password) => {
    // Check if the user exists in the admins.json file
    const adminUser = admins.find(
      (user) => user.username === username && user.password === password
    );
    if (adminUser) {
      setUserType(adminUser.role); // Set the user type after successful login
      localStorage.setItem("userType", adminUser.role); // Store userType in localStorage
      setLoggedIn(true);
      return;
    }

    // Check if the user exists in the teachingStaff.json file
    const staffUser = teachingStaff.find(
      (user) => user.username === username && user.password === password
    );
    if (staffUser) {
      setUserType(staffUser.role); // Set the user type after successful login
      localStorage.setItem("userType", staffUser.role); // Store userType in localStorage
      setLoggedIn(true);
      return;
    }

    // Check if the user exists in the students.json file
    const studentUser = students.find(
      (user) => user.username === username && user.password === password
    );
    if (studentUser) {
      setUserType(studentUser.role); // Set the user type after successful login
      localStorage.setItem("userType", studentUser.role); // Store userType in localStorage
      setLoggedIn(true);
      return;
    }

    // Handle invalid credentials
    setModalTitle("Warning");
    setModalMessage("Invalid credentials. Please try again.");
    setShowModalLogin(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserType("");
    setModalTitle("Logout");
    setModalMessage("Logout successful.");
    setShowModalLogin(true);
    localStorage.removeItem("userType"); // Clear all localStorage data
  };

  const handleAddStudent = (newStudent) => {
    // Assign a unique ID to the new student
    newStudent.id = Date.now();
    setStudents([...students, newStudent]); // Add the new student to the list
  };

  const handleAddNewNotice = (newStudentNotice) => {
    setStudentNotices(newStudentNotice); // Add the new student notice to the list
  };

  const handleAddNewNoticeTeacher = (newStudentNotice) => {
    setTeacherNotices(newStudentNotice); // Add the new teacher notice to the list
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
              userType={userType}
            />
          }
          when={
            loggedIn && (userType === "admin" || userType === "teachingStaff")
          }
        />

        {/* Route for adding a student */}

        <Route
          path="/add-student"
          element={
            <AddStudentForm
              students={students}
              teachingStaff={teachingStaff}
              admin={admins}
              handleAddStudent={handleAddStudent}
              userType={userType}
            />
          }
          when={loggedIn && userType === "admin"}
        />
        {/* Route for viewing student notices */}
        <Route
          path="/student-notice"
          element={
            <StudentNotice
              studentNotices={studentNotices}
              userType={userType}
              handleAddNewNotice={handleAddNewNotice}
            />
          }
          when={loggedIn && userType === "student"}
        />

        {/* Route for viewing teacher notices */}
        <Route
          path="/teacher-notice"
          element={
            <TeacherNotice
              teacherNotices={teacherNotices}
              userType={userType}
              handleAddNewNotice={handleAddNewNoticeTeacher}
            />
          }
          when={loggedIn && userType === "teachingStaff"}
        />

        {/* Route for leave management */}
        <Route
          path="/leave-management"
          element={
            <LeaveManagement userType={userType} handleLogout={handleLogout} />
          }
          when={(loggedIn && userType === "teachingStaff") || "student"}
        />

        {/* Route for task management */}
        <Route
          path="/task-management"
          element={
            <TaskManagement userType={userType} handleLogout={handleLogout} />
          }
          when={(loggedIn && userType === "teachingStaff") || "student"}
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
      {showModalLogin && (
        <LogoutModalLogin
          showModal={showModalLogin}
          setShowModal={setShowModalLogin}
          title={modalTitle}
          message={modalMessage}
        />
      )}
    </Router>
  );
};

export default App;
