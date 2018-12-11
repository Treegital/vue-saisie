

export const auth_service = {
    login,
    logout,
    LOGIN_URL,
};


export const API_URL = 'http://localhost:8000/'
export const LOGIN_URL = API_URL + 'account/login'


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

function login(creds) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creds)
    };

    return fetch(LOGIN_URL, requestOptions)
        .then(handleResponse)
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                return true
            }
            return false;
        });
}

function logout() {
    localStorage.removeItem('token');
}


export default auth_service
