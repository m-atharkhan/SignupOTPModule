// SignupSuccess.jsx
import React from 'react';
import styles from './Succcess.module.css'

const SignupSuccess = ({email}) => {
  return (
      <div className={`${styles.success}`}>
        <h1 className="display-5 fw-bold text-emphasis lh-1 mb-3 text-white">Welcome <span style={{color: 'blue'}}>{email}</span> <br/> Registration Successfull!</h1>
      </div>
  );
};

export default SignupSuccess;
