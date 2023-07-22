import React, { useState } from "react";

const AddStudentForm = ({ handleAddStudent }) => {
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
    role: "student"
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Handle file validation for photo field
    if (type === "file" && name === "photo") {
      const file = e.target.files[0];
      const validTypes = ["image/jpeg", "image/png"];
      if (file && !validTypes.includes(file.type)) {
        // Invalid file type, reset the input value
        e.target.value = "";
        setFormData({ ...formData, [name]: "" });
        alert("Please select a valid image file (jpg, jpeg, or png).");
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddStudent(formData);
    // Clear form fields after submission
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
    });
  };

  // Validation functions
  const isAlphaOnly = (input) => /^[A-Za-z]+$/.test(input);
  const isFutureDate = (date) => new Date(date) > new Date();

  return (
    <div>
      <h3>Add Student</h3>
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
            minLength={3}
            maxLength={10}
            pattern="^[A-Za-z]+$"
          />
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
        </div>
        <div>
          <label htmlFor="standard">Standard</label>
          <input
            type="text"
            id="standard"
            name="standard"
            value={formData.standard}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="division">Division</label>
          <input
            type="text"
            id="division"
            name="division"
            value={formData.division}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            required
          />
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
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddStudentForm;
