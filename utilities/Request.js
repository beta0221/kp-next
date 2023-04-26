function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
}

export default authHeaders