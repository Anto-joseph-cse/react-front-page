// EvidenceUploadPage.js
import React, { useState } from "react";
import "./EvidenceUpload.css";

function EvidenceUploadPage() {
  const [evidenceName, setEvidenceName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [fileFormat, setFileFormat] = useState("");
  const [file, setFile] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowWarning(true); // Show the warning modal
  };

  const confirmUpload = () => {
    setShowWarning(false);
    console.log("Evidence submitted:", {
      evidenceName,
      date,
      description,
      fileFormat,
      file,
    });
  };

  const cancelUpload = () => {
    setShowWarning(false); // Hide modal without submitting
  };

  return (
    <div className="evidence-upload-container">
      <div className="evidence-upload-page container">
        <h2>Upload Evidence</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Evidence Name:</label>
            <input
              type="text"
              value={evidenceName}
              onChange={(e) => setEvidenceName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Description (optional):</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Type of Evidence:</label>
            <select
              value={fileFormat}
              onChange={(e) => setFileFormat(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="video">Video (.mp4, .avi)</option>
              <option value="image">Image (.png, .jpg, .jpeg)</option>
              <option value="document">PDF (.pdf)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Upload File:</label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              accept=".mp4, .avi, .png, .jpg, .jpeg, .pdf"
            />
          </div>

          <button type="submit">Submit</button>
        </form>

        {showWarning && (
          <div className="modal">
            <div className="modal-content">
              <p>
                Warning: Once uploaded, the details cannot be changed. Are you sure you want to proceed?
              </p>
              <button onClick={confirmUpload} className="confirm-btn">Yes, Proceed</button>
              <button onClick={cancelUpload} className="cancel-btn">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EvidenceUploadPage;
