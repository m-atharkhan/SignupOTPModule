// SendOTP.jsx
import React, { useState } from 'react';
import axios from 'axios';
import styles from './Signup.module.css';

const SendOTP = ({ onOtpSent, setMessage }) => {
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');

    const sendOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/send-otp', { mobile, email });
            setMessage(response.data.message);
            setEmail(response.data.email)
            onOtpSent(mobile,email); // Pass mobile to parent
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || 'Error sending OTP!');
        }
    };

    return (
        <form onSubmit={sendOtp}>
            <input
                className={styles.input}
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
                required
            />
            <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />
            <button type="submit" className={`${styles.button} btn btn-primary btn-lg`}>
                Send OTP
            </button>
        </form>
    );
};

export default SendOTP;
