// Signup.jsx
import React, { useState } from 'react';
import SendOTP from './SendOTP';
import VerifyOTP from './VerifyOTP';
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';

const Signup = ({ setMobile , setEmail, email}) => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleOtpSent = (mobile, email) => {
        setMobile(mobile); // Save mobile number for verification
        setEmail(email);
        setIsOtpSent(true);
    };
 
    const handleVerified = () => {
        setMessage('OTP verified successfully! Welcome!');
        navigate('/success'); // Navigate to the success page
    };

    return (
        <div className={styles.form}>
            <h1 className={styles.heading}>Signup</h1>
            {!isOtpSent ? (
                <SendOTP onOtpSent={handleOtpSent} setMessage={setMessage} />
            ) : (
                <VerifyOTP mobile={setMobile} onVerified={handleVerified} setMessage={setMessage} email={email}/>
            )}
            {message && <p className={styles.status}>{message}</p>}
        </div>
    );
};

export default Signup;
