// VerifyOTP.jsx
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Signup.module.css';

const VerifyOTP = ({ mobile, onVerified, setMessage, email }) => {
    const [otp, setOtp] = useState('');

    const verifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { mobile, otp });
            setMessage(response.data.message);
            onVerified(); 
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error verifying OTP!');
        }
    };

    return (
        <form onSubmit={verifyOtp}>
            <input
                className={styles.input}
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
            />
            <button type="submit" className={`${styles.button} btn btn-primary btn-lg`}>
                Verify OTP
            </button>
        </form>
    );
};

export default VerifyOTP;
