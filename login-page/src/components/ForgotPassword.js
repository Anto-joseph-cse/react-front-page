import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './ForgotPassword.css';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [captchaAnswer, setCaptchaAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function

    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        return { question: `What is ${num1} + ${num2}?`, answer: num1 + num2 };
    }

    const validatePassword = (password) => {
        const requirements = [
            { test: password.length >= 8, message: 'Password must be at least 8 characters long.' },
            { test: /[A-Za-z]/.test(password), message: 'Password must contain at least one letter.' },
            { test: /[0-9]/.test(password), message: 'Password must contain at least one number.' },
            { test: /[!@#$%^&*]/.test(password), message: 'Password must contain at least one special character (!@#$%^&*).' },
        ];
        const failedRequirements = requirements.filter(req => !req.test).map(req => req.message);
        return failedRequirements.length > 0 ? failedRequirements : null;
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const passwordValidationErrors = validatePassword(newPassword);
        if (passwordValidationErrors) {
            setMessage(passwordValidationErrors.join(' '));
            return;
        }

        if (parseInt(captchaAnswer) !== captcha.answer) {
            setMessage('Incorrect CAPTCHA answer');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/reset-password', {
                email,
                newPassword,
            });

            // Show success modal
            setShowSuccessModal(true);
            setMessage('');
            // Clear fields after a successful reset
            setEmail('');
            setNewPassword('');
            setConfirmPassword('');
            setCaptchaAnswer('');
        } catch (error) {
            setMessage(error.response ? error.response.data : 'Error resetting password');
        }
    };

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
    };

    const handleReturnToLogin = () => {
        navigate('/login'); // Navigate to the login page
    };

    return (
        <div className="forgot-password-container">
            <h2>Reset Password</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handlePasswordReset}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>New Password:</label>
                    <input type={showPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    <button type="button" className="show-password-button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <div className="form-group captcha-container">
                    <label>{captcha.question}</label>
                    <input
                        type="text"
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                        required
                        placeholder="Enter your answer"
                    />
                    <button type="button" className="refresh-captcha-button" onClick={refreshCaptcha}>Refresh</button>
                </div>
                <button type="submit" className="reset-password-button">Update Password</button>
            </form>
            <div className="password-requirements-section">
                <p>Password must be at least 8 characters long, contain letters, numbers, and special characters.</p>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Password Updated Successfully</h3>
                       
                        <button onClick={handleReturnToLogin}>Back to Login</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ForgotPassword;
