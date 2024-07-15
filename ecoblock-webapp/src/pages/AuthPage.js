    import React, { useState } from 'react';
    import Register from '../components/auth/Register';
    import Login from '../components/auth/Login';
    import './AuthPage.css';

    const Auth = () => {
    const [isRegister, setIsRegister] = useState(true);

    const toggleAuthMode = () => {
    setIsRegister(!isRegister);
    };

    return (
    <div className='auth-page'>
        <div className="auth-container">
            {isRegister ? <Login /> : <Register />}
            <button className="toggle-button" onClick={toggleAuthMode}>
                {isRegister ?  'Don\'t have an account? Register' : 'Already have an account? Login' }
            </button>
        </div>
    </div>
    );
};

    export default Auth;
