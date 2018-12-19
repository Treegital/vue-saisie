import { API_URL, handleResponse, logout } from './common';


function login(creds) {

    const URL = API_URL + 'account/login'
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds)
    };

    return fetch(URL, requestOptions)
        .then(handleResponse)
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                if (data.current) {
                    localStorage.setItem('item', data.current);
                }
                return data
            }
            return null;
        });
}

export const auth_service = {
    login,
    logout,
};

export default auth_service
