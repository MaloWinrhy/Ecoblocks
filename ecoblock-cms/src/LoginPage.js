import * as React from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import { useState } from 'react';
import { Card, CardContent, TextField, Button } from '@mui/material';

const LoginPage = ({ theme }) => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const submit = (e) => {
        e.preventDefault();
        login({ email, password }).catch(() => notify('Invalid email or password'));
    };

    return (
        <form onSubmit={submit}>
            <Card>
                <CardContent>
                    <div>
                        <TextField
                            label="Email"
                            name="email"
                            value={email}
                            onChange={e => setemail(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <div>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <Button variant="contained" type="submit" color="primary">
                        Login
                    </Button>
                </CardContent>
            </Card>
            <Notification />
        </form>
    );
};

export default LoginPage;
