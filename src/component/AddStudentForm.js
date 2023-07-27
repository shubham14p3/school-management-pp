import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddStudentModal from "./AddStudentModal";
import Dashboard from "./Dashboard";
import "./AddStudentForm.css";

const AddStudentForm = ({
  handleAddStudent,
  students,
  teachingStaff,
  admin,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    standard: "",
    division: "",
    address: "",
    photo: "",
    username: "",
    password: "",
    role: "student",
  });

  // State to store validation errors for each field
  const [showModal, setShowModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("userType");
    navigate("/");
  };
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle file validation for photo field
    if (type === "file" && name === "photo") {
      const file = e.target.files[0];
      const validTypes = ["image/jpeg", "image/jpg"];
      if (file && !validTypes.includes(file.type)) {
        // Invalid file type, reset the input value
        e.target.value = "";
        setFormData({ ...formData, [name]: "" });
        setValidationErrors({
          ...validationErrors,
          [name]: "Please select a valid image file (jpg or jpeg).",
        });
        return;
      }
    }

    // Reset validation error for the current field
    setValidationErrors({ ...validationErrors, [name]: "" });

    // Perform custom validations for each field
    switch (name) {
      case "firstName":
        if (!/^[A-Za-z]{3,}$/.test(value.trim())) {
          setValidationErrors({
            ...validationErrors,
            [name]:
              "First name should have at least 3 letters and only contain text.",
          });
        }
        break;
      case "lastName":
        if (!/^[A-Za-z]{3,}$/.test(value.trim())) {
          setValidationErrors({
            ...validationErrors,
            [name]:
              "Last name should have at least 3 letters and only contain text.",
          });
        }
        break;
      case "birthdate":
        const currentDate = new Date();
        const selectedDate = new Date(value);
        if (selectedDate > currentDate) {
          setValidationErrors({
            ...validationErrors,
            [name]: "Birthdate cannot be in the future.",
          });
        }
        break;
      case "standard":
        if (!/^[1-9]|1[0-2]$/.test(value)) {
          setValidationErrors({
            ...validationErrors,
            [name]: "Standard should be a number between 1 and 12.",
          });
        }
        break;
      case "division":
        if (!/^[A-Za-z]$/.test(value)) {
          setValidationErrors({
            ...validationErrors,
            [name]: "Division should be a single letter (A-Z).",
          });
        }
        break;
      case "address":
        if (value.length > 100) {
          setValidationErrors({
            ...validationErrors,
            [name]: "Address should not exceed 100 characters.",
          });
        }
        break;
      default:
        break;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Open the modal on form submission
    setShowModal(true);
  };

  const handleConfirmSubmit = () => {
    // Call the add student function to submit the data
    const usernameExists = students.some(
      (student) => student.username === formData.username
    );
    const teacherUsernameExists = teachingStaff.some(
      (teacher) => teacher.username === formData.username
    );
    const adminUsernameExists = admin.some(
      (adminUser) => adminUser.username === formData.username
    );

    if (usernameExists || teacherUsernameExists || adminUsernameExists) {
      alert("Username already exists. Please choose a different username.");
      return;
    } else {
      handleAddStudent(formData);

      // Clear form fields after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        birthdate: "",
        standard: "",
        division: "",
        address: "",
        photo: "",
        username: "",
        password: "",
        role: "student",
      });

      // Close the modal after successful submission
      setShowModal(false);
      navigate("/view-students");
    }
  };

  const handleCloseModal = () => {
    // Reset the form data on modal close
    setFormData({
      firstName: "",
      lastName: "",
      birthdate: "",
      standard: "",
      division: "",
      address: "",
      photo: "",
      username: "",
      password: "",
      role: "student",
    });

    // Close the modal
    setShowModal(false);
  };

  // Validation functions
  const isAlphaOnly = (input) => /^[A-Za-z]+$/.test(input);
  const isFutureDate = (date) => new Date(date) > new Date();

  return (
    <Dashboard userType="admin" handleLogout={handleLogout}>
      <div className="add-student-form-container">
        <h3 className="add-student-header">Add Student</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {validationErrors.firstName && (
              <span className="validation-error">
                {validationErrors.firstName}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={10}
              pattern="^[A-Za-z]+$"
            />
            {validationErrors.lastName && (
              <span className="validation-error">
                {validationErrors.lastName}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="birthdate">Birthdate</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
              max={new Date().toISOString().split("T")[0]} // Restricts future dates
            />
            {validationErrors.birthdate && (
              <span className="validation-error">
                {validationErrors.birthdate}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="standard">Standard</label>
            <select
              id="standard"
              name="standard"
              value={formData.standard}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="">Select Standard</option>
              {Array.from({ length: 12 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            {validationErrors.standard && (
              <span className="validation-error">
                {validationErrors.standard}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="division">Division</label>
            <select
              id="division"
              name="division"
              value={formData.division}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="">Select Division</option>
              {Array.from({ length: 26 }, (_, index) => (
                <option key={index} value={String.fromCharCode(65 + index)}>
                  {String.fromCharCode(65 + index)}
                </option>
              ))}
            </select>
            {validationErrors.division && (
              <span className="validation-error">
                {validationErrors.division}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              maxLength={100}
            />
            {validationErrors.address && (
              <span className="validation-error">
                {validationErrors.address}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="photo">Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/jpeg, image/jpg"
              onChange={handleChange}
              required
            />
            {validationErrors.photo && (
              <span className="validation-error">{validationErrors.photo}</span>
            )}
          </div>

          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {validationErrors.username && (
              <span className="validation-error">
                {validationErrors.username}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {validationErrors.password && (
              <span className="validation-error">
                {validationErrors.password}
              </span>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>

        {/* Custom Modal */}
        <AddStudentModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onConfirm={handleConfirmSubmit}
          modalData={formData}
        />
      </div>
    </Dashboard>
  );
};

export default AddStudentForm;
