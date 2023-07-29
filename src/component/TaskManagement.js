import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
const TaskManagement = ({
  userType,
  students,
  loggedInUser,
  admins,
  teachingStaff,
  studentTasks,
}) => {
  const navigate = useNavigate();
  const [studentsData, setStudentsData] = useState(students);
  const [tasks, setTasks] = useState(studentTasks);
  const [newTask, setNewTask] = useState({
    studentName: "",
    firstName: "",
    lastName: "",
    taskTitle: "",
    taskDescription: "",
    assignedBy: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

    // Create a new task object
    const task = {
      id: taskId,
      studentId: newTask.studentName,
      firstName: newTask.firstName,
      lastName: newTask.lastName,
      taskTitle: newTask.taskTitle,
      taskDescription: newTask.taskDescription,
      assignedBy: newTask.assignedBy,
    };

    // Save the new task to the tasks array and update the state
    setTasks([...tasks, task]);

    // Save the tasks to the local storage
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));

    // Clear the new task input fields
    setNewTask({
      studentName: "",
      firstName: "",
      lastName: "",
      taskTitle: "",
      taskDescription: "",
      assignedBy: "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userType");
    navigate("/");
  };
  return (
    <Dashboard userType={userType} handleLogout={handleLogout}>
      <div>
        <h2>Task Management</h2>
        <form onSubmit={handleAddTask}>
          <div>
            <label htmlFor="studentName">Student Name</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={newTask.studentName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={newTask.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={newTask.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="taskTitle">Task Title</label>
            <input
              type="text"
              id="taskTitle"
              name="taskTitle"
              value={newTask.taskTitle}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="taskDescription">Task Description</label>
            <textarea
              id="taskDescription"
              name="taskDescription"
              value={newTask.taskDescription}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="assignedBy">Assigned By</label>
            <input
              type="text"
              id="assignedBy"
              name="assignedBy"
              value={newTask.assignedBy}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Add Task</button>
        </form>

        {tasks.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Task Title</th>
                <th>Task Description</th>
                <th>Assigned By</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.studentId}</td>
                  <td>{task.firstName}</td>
                  <td>{task.lastName}</td>
                  <td>{task.taskTitle}</td>
                  <td>{task.taskDescription}</td>
                  <td>{task.assignedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </Dashboard>
  );
};

export default TaskManagement;
