import { API_URL, handleResponse } from './common';


function available() {

    const URL = API_URL + 'items/pool'
    var token = localStorage.getItem('token');

    return fetch(URL, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then(handleResponse)
        .then(data => {
            return data
        });
}

function assign(item) {

    const URL = API_URL + 'items/assign'
    var token = localStorage.getItem('token');
    
    return fetch(URL, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(handleResponse)
        .then(data => {
            if (data.assigned) {
                localStorage.setItem('item', data.assigned);
                return data
            }
            return null;
        });
}

function deassign() {

    const URL = API_URL + 'items/deassign'
    var token = localStorage.getItem('token');
    var item = localStorage.getItem('item');

    return fetch(URL, {
        method: 'POST',
        body: JSON.stringify({filename: item}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(handleResponse)
        .then(data => {
            localStorage.removeItem('item');
            return data;
        });
}

function about(filename) {

    var URL = API_URL + 'items/about/' + filename
    var token = localStorage.getItem('token');

    return fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(handleResponse)
        .then(data => {
            return data;
        });
}

export const items_service = {
    available,
    assign,
    deassign,
    about
};

export default items_service
