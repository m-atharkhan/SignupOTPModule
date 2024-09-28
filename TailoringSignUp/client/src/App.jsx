import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import SignupSuccess from './components/SignupSuccess'; // Ensure you have this component
import styles from './App.module.css';

function App() {
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Router>
      <div className={`${styles.bg}`}>
        <Routes>
          <Route path="/" element={<Signup setMobile={setMobile} setEmail={setEmail} email={email}/>} />
          <Route path="/success" element={<SignupSuccess email={email}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
