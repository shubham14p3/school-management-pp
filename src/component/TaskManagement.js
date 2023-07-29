import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import "./TaskManagement.css"; // Import the custom CSS file

const TaskManagement = ({
  userType,
  students,
  loggedInUser,
  admins,
  teachingStaff,
  studentTasks,
  setStudentTasks,
}) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(studentTasks);
  const [newTask, setNewTask] = useState({
    studentName: "",
    taskTitle: "",
    taskDescription: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const selectedStudent = await students.find(
      (student) => student.id == newTask.studentName
    );
    const task = {
      id: taskId,
      firstName: selectedStudent ? selectedStudent.firstName : "Loggin Again", // Save the first name of the selected student
      lastName: selectedStudent ? selectedStudent.lastName : "Loggin Again", // Save the last name of the selected student
      assignedBy: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
      studentId: newTask.studentName,
      taskDescription: newTask.taskDescription,
      taskTitle: newTask.taskTitle,
    };

    // Save the new task to the tasks array and update the state
    setTasks([...tasks, task]);

    // Save the tasks to the local storage
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));

    // Update the studentTasks in App component
    setStudentTasks([...studentTasks, task]);

    // Clear the new task input fields
    setNewTask({
      studentName: "",
      taskTitle: "",
      taskDescription: "",
    });
  };

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <Dashboard userType={userType} handleLogout={handleLogout}>
      <div>
        <h2>Task Management</h2>
        <form onSubmit={handleAddTask}>
          <div>
            <label htmlFor="studentName">Student Name</label>
            <select
              id="studentName"
              name="studentName"
              value={newTask.studentName}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </select>
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
            <label>Assigned By</label>
            <input
              type="text"
              disabled
              value={
                loggedInUser
                  ? `${loggedInUser.firstName} ${loggedInUser.lastName}`
                  : "Log Out & Log In Again"
              }
            />
          </div>
          <button type="submit">Add Task</button>
        </form>

        {tasks.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student Name</th>
                  <th>Task Title</th>
                  <th>Task Description</th>
                  <th>Assigned By</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  const student = students.find((student) => {
                    return student.id == task.studentId;
                  });
                  const studentName = student
                    ? `${student.firstName} ${student.lastName}`
                    : "Unknown Student";

                  return (
                    <tr key={task.id}>
                      <td>{task.id}</td>
                      <td>{studentName}</td>
                      <td>{task.taskTitle}</td>
                      <td>{task.taskDescription}</td>
                      <td>{task.assignedBy}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </Dashboard>
  );
};

export default TaskManagement;
