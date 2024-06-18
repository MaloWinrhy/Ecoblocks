    import React, { useState } from 'react';
    import Register from './Register';
    import Login from './Login';
    import './Auth.css';
    import Header from '../common/Header';
    import Footer from '../common/Footer';

    const Auth = () => {
    const [isRegister, setIsRegister] = useState(true);

    const toggleAuthMode = () => {
    setIsRegister(!isRegister);
    };

    return (
    <div className='auth-page'>
        <Header />
        <div className="auth-container">
            {isRegister ? <Register /> : <Login />}
            <button className="toggle-button" onClick={toggleAuthMode}>
                {isRegister ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
            </button>
        </div>
        <Footer />
    </div>
    );
};

    export default Auth;
