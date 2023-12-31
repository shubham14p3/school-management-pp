import React, { useState, useEffect } from "react";
import "./StudentNotice.css"; // Import the custom CSS file
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
const StudentNotice = ({ studentNotices, userType, handleAddNewNotice }) => {
  const navigate = useNavigate();
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [defaultNotice, setDefaultNotice] = useState(studentNotices);
  const [showAddNoticeForm, setShowAddNoticeForm] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    date: "",
  });
  useEffect(() => {
    setDefaultNotice(studentNotices);
  }, [studentNotices]);

  // Function to handle opening the individual notice
  const handleOpenNotice = (noticeId) => {
    const isAdmin = userType;
    if (isAdmin) {
      const notice = studentNotices.find((notice) => notice.id === noticeId);
      setSelectedNotice(notice);
    }
  };

  // Function to handle closing the individual notice
  const handleCloseNotice = () => {
    setSelectedNotice(null);
  };

  // Function to handle form submission for adding a new notice
  const handleAddNotice = (event) => {
    event.preventDefault();
    // Assuming you have a function to generate a unique ID (e.g., using uuid library)
    const newNoticeWithId = { id: Date.now(), ...newNotice };
    const updatedNotices = [newNoticeWithId, ...studentNotices];
    handleAddNewNotice(updatedNotices);
    setNewNotice({
      title: "",
      content: "",
      date: "",
    });
    setShowAddNoticeForm(false);
  };

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <Dashboard userType={userType} handleLogout={handleLogout}>
      <div>
        <h3>Student Notices</h3>
        {/* Form to add a new student notice */}
        {userType === "admin" && (
          <div>
            <button
              className="btn btn-primary"
              onClick={() => setShowAddNoticeForm(!showAddNoticeForm)}
            >
              {showAddNoticeForm ? "Cancel" : "Add New Notice"}
            </button>
            {showAddNoticeForm && (
              <form onSubmit={handleAddNotice}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={newNotice.title}
                    onChange={(e) =>
                      setNewNotice({ ...newNotice, title: e.target.value })
                    }
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Content</label>
                  <textarea
                    value={newNotice.content}
                    onChange={(e) =>
                      setNewNotice({ ...newNotice, content: e.target.value })
                    }
                    className="form-control"
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={newNotice.date}
                    onChange={(e) =>
                      setNewNotice({ ...newNotice, date: e.target.value })
                    }
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Add Notice
                </button>
              </form>
            )}
          </div>
        )}
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {defaultNotice.map((notice) => (
              <tr key={notice.id} onClick={() => handleOpenNotice(notice.id)}>
                <td>{notice.title}</td>
                <td>{notice.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedNotice && (
          <div className="popup">
            <div className="popup-content">
              <h3>{selectedNotice.title}</h3>
              <p>Date: {selectedNotice.date}</p>
              <p>{selectedNotice.content}</p>
              <button onClick={handleCloseNotice}>Close</button>
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default StudentNotice;
