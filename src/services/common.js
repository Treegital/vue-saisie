export const API_URL = 'http://meadow.comeonweb.com/'


export const logout = function() {
    localStorage.removeItem('token');
    localStorage.removeItem('item');
}


export const handleResponse = function(response) {
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
