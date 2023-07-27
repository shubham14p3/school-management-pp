// TaskManagement.js
import React, { useState } from "react";
import Dashboard from "./Dashboard";
const TaskManagement = ({ userType,handleLogout }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    // Handle adding tasks to students
    console.log("Task Title:", taskTitle);
    console.log("Task Description:", taskDescription);
  };

  return (
    <Dashboard userType="admin" handleLogout={handleLogout}>
      <div>
        <h3>Task Management</h3>
        {userType === "teacher" ? (
          <form onSubmit={handleAddTask}>
            <div>
              <label htmlFor="taskTitle">Task Title</label>
              <input
                type="text"
                id="taskTitle"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="taskDescription">Task Description</label>
              <textarea
                id="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
            <button type="submit">Add Task</button>
          </form>
        ) : (
          // Show the task list for students
          <div>{/* Implement the task list for students here */}</div>
        )}
      </div>
    </Dashboard>
  );
};

export default TaskManagement;
