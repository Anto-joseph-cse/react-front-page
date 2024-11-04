// src/components/File.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './File.css';
import { FaUpload, FaCheckCircle } from 'react-icons/fa';

function File() {
  const navigate = useNavigate();

  const handleFileUploadClick = () => {
    navigate('/upload-evidence'); // Navigate to UploadEvidence page
  };

  const handleVerifyFile = () => {
    alert('File verified!'); // Placeholder for verification logic
  };

  return (
    <div className="upload-file-page">
      <h2>Upload Your File</h2>
      <div className="button-row">
        <button className="upload-button" onClick={handleFileUploadClick}>
          <FaUpload size={24} style={{ marginRight: '8px' }} />
          <span>Upload File</span>
        </button>
        <button className="verify-button" onClick={handleVerifyFile}>
          <FaCheckCircle size={24} style={{ marginRight: '8px' }} />
          Verify File
        </button>
      </div>
    </div>
  );
}

export default File;
