// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountCreation from './components/AccountCreation'; // Adjust path as necessary
import LoginPage from './components/LoginPage'; 
import File from './components/File';
import UploadEvidence from './components/EvidenceUpload'; // Adjust path as necessary
import WelcomePage from './components/WelcomePage'; 
import ForgotPassword from './components/ForgotPassword'; // Import the WelcomePage component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} /> {/* Welcome page as the landing page */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/account-creation" element={<AccountCreation />} />
                <Route path="/account" element={<AccountCreation />} />
                <Route path="/file" element={<File />} /> 
                <Route path="/upload-evidence" element={<UploadEvidence />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/login" component={LoginPage} />
            </Routes>
        </Router>
    );
};

export default App;
