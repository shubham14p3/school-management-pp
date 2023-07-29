import React from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import "./studentTaskList.css";

const StudentTaskList = ({ tasks, userType, loggedInUser }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  // Filter tasks based on the studentId of the logged-in student
  const studentTasks = tasks.filter((task) => {
    return task.studentId == loggedInUser.id;
  });

  return (
    <Dashboard userType={userType} handleLogout={handleLogout}>
      <div>
        <h3>My Tasks</h3>
        {studentTasks.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Task Description</th>
                <th>Assigned By</th>
              </tr>
            </thead>
            <tbody>
              {studentTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.taskTitle}</td>
                  <td>{task.taskDescription}</td>
                  <td>{task.assignedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tasks assigned to you.</p>
        )}
      </div>
    </Dashboard>
  );
};

export default StudentTaskList;
