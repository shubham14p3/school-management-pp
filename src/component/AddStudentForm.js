// AddStudentForm.js
import React, { useState } from 'react';

const AddStudentForm = ({ handleAddStudent }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    standard: '',
    division: '',
    address: '',
    photo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddStudent(formData);
    // Clear form fields after submission
    setFormData({
      firstName: '',
      lastName: '',
      birthdate: '',
      standard: '',
      division: '',
      address: '',
      photo: '',
    });
  };

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
          />
        </div>
        {/* Add other form fields as required */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddStudentForm;
