import http from 'k6/http';

export function getRequest(url, headers) {
    return http.get(url, { headers });
}

export function postRequest(url, body, headers) {
    return http.post(url, body, { headers });
}
