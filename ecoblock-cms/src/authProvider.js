
const authProvider = {
    login: ({ email, password }) => {
        console.log('Login attempt with email:', email);
        const request = new Request('http://localhost:8000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                const decodedToken = jwtDecode(auth.token);
                console.log('Decoded token:', decodedToken);
                if (decodedToken.role !== 'ADMIN') {
                    console.error('Unauthorized role:', decodedToken.role);
                    throw new Error('Unauthorized');
                }
                localStorage.setItem('auth', JSON.stringify(auth));
                return Promise.resolve();
            })
            .catch(error => {
                console.error('Login failed:', error);
                throw new Error('Login failed');
            });
    },
    logout: () => {
        console.log('Logout called');
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    checkAuth: () => {
        console.log('Check auth called');
        return localStorage.getItem('auth') ? Promise.resolve() : Promise.reject();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            console.log('Check error called with status:', status);
            localStorage.removeItem('auth');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
};

export default authProvider;
