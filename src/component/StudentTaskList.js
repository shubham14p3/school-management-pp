import React from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
const StudentTaskList = ({ tasks,userType }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userType");
    navigate("/");
  };
  return (
    <Dashboard userType={userType} handleLogout={handleLogout}>
      <div>
        <h3>My Tasks</h3>
        {tasks.map((task) => (
          <div key={task.id}>
            <p>Task Title: {task.taskTitle}</p>
            <p>Task Description: {task.taskDescription}</p>
            <p>Task Assigned By: {task.assignedBy}</p>
          </div>
        ))}
      </div>
    </Dashboard>
  );
};

export default StudentTaskList;
