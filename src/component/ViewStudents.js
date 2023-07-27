import React, { useState } from "react";
import Dashboard from "./Dashboard";
import "./ViewStudents.css"; // Import custom CSS file for styling
import { useNavigate } from "react-router-dom";
const ViewStudents = ({
  students,
  handleEditStudent,
  handleDeleteStudent
}) => {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState(null);

  const studentsPerPage = 5;

  const filteredStudents = students.filter((student) =>
    student.firstName.toLowerCase().includes(filterText.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const startEditing = (studentId) => {
    const studentToEdit = students.find((student) => student.id === studentId);
    setEditingStudent(studentToEdit);
  };

  const cancelEditing = () => {
    setEditingStudent(null);
  };

  const saveEditing = () => {
    if (editingStudent) {
      handleEditStudent(editingStudent.id, editingStudent);
      setEditingStudent(null);
    }
  };

  const handleFieldChange = (e, fieldName) => {
    const newValue = e.target.value;
    setEditingStudent((prevStudent) => ({
      ...prevStudent,
      [fieldName]: newValue,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("userType");
    navigate("/");
  };
  return (
    <Dashboard userType="admin" handleLogout={handleLogout}>
      <div className="view-students-container">
        <h3>View Students</h3>
        <div className="filter-input">
          <input
            type="text"
            placeholder="Filter by First Name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Birthdate</th>
              <th>Standard</th>
              <th>Division</th>
              <th>Address</th>
              <th>Username</th>
              <th>Password</th>
              <th>Photo</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>
                  {editingStudent && editingStudent.id === student.id ? (
                    <input
                      type="text"
                      value={editingStudent.firstName}
                      onChange={(e) => handleFieldChange(e, "firstName")}
                    />
                  ) : (
                    student.firstName
                  )}
                </td>
                <td>
                  {editingStudent && editingStudent.id === student.id ? (
                    <input
                      type="text"
                      value={editingStudent.lastName}
                      onChange={(e) => handleFieldChange(e, "lastName")}
                    />
                  ) : (
                    student.lastName
                  )}
                </td>
                <td>
                  {editingStudent && editingStudent.id === student.id ? (
                    <input
                      type="date"
                      value={editingStudent.birthdate}
                      onChange={(e) => handleFieldChange(e, "birthdate")}
                    />
                  ) : (
                    student.birthdate
                  )}
                </td>
                <td>
                  {editingStudent && editingStudent.id === student.id ? (
                    <input
                      type="text"
                      value={editingStudent.standard}
                      onChange={(e) => handleFieldChange(e, "standard")}
                    />
                  ) : (
                    student.standard
                  )}
                </td>
                <td>
                  {editingStudent && editingStudent.id === student.id ? (
                    <input
                      type="text"
                      value={editingStudent.division}
                      onChange={(e) => handleFieldChange(e, "division")}
                    />
                  ) : (
                    student.division
                  )}
                </td>
                <td>
                  {editingStudent && editingStudent.id === student.id ? (
                    <textarea
                      value={editingStudent.address}
                      onChange={(e) => handleFieldChange(e, "address")}
                    />
                  ) : (
                    student.address
                  )}
                </td>
                <td>{student.username}</td>
                <td>
                  {/* Show password in password format */}
                  <input type="password" value={student.password} disabled />
                </td>
                <td>
                  {/* Display student photo */}
                  <img
                    src={student.photo}
                    alt={`${student.firstName} ${student.lastName}`}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>

                <td>
                  <div className="edit-buttons">
                    {editingStudent && editingStudent.id === student.id ? (
                      <>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={saveEditing}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={cancelEditing}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => startEditing(student.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(filteredStudents.length / studentsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`btn btn-sm ${
                  currentPage === index + 1 ? "btn-primary" : "btn-secondary"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
        {filteredStudents.length === 0 && (
          <p className="no-records-found">No records found.</p>
        )}
      </div>
    </Dashboard>
  );
};

export default ViewStudents;
