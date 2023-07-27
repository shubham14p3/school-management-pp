import React from 'react';
import './AddStudentModal.css';

const AddStudentModal = ({ isOpen, onClose, onConfirm, modalData }) => {
  return (
    <div className={`add-student-modal ${isOpen ? 'open' : ''}`}>
      <div className="add-student-modal-content">
        <h3>Confirm Details</h3>
        <p>First Name: {modalData.firstName}</p>
        <p>Last Name: {modalData.lastName}</p>
        <p>Birthdate: {modalData.birthdate}</p>
        <p>Standard: {modalData.standard}</p>
        <p>Division: {modalData.division}</p>
        <p>Address: {modalData.address}</p>
        <p>Photo: {modalData.photo}</p>
        <p>Username: {modalData.username}</p>
        <p>Password: {modalData.password}</p>
        <p>Role: {modalData.role}</p>
        {/* You can add other fields here as per your form data */}
        <button onClick={onClose}>Cancel</button>
        {`     `}
        <button onClick={onConfirm}>Submit</button>
      </div>
    </div>
  );
};

export default AddStudentModal;
