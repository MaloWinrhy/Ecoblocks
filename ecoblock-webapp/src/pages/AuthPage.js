    import React, { useState } from 'react';
    import Register from '../components/auth/Register';
    import Login from '../components/auth/Login';
    import './AuthPage.css';
    import Header from '../components/common/Header';
    import Footer from '../components/common/Footer';

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
