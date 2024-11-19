import Service from "./Service"


const AuthApi = {

    getUser: async function() {
        const response = await fetch(`${Service.baseUrl}/api/auth/user`, {
            headers: Service.getAuthHeader()
        })
            
        return await response.json()
    },
    login: async function(email, password) {
        const response = await fetch(`${Service.baseUrl}/api/auth/login`, {
            body: JSON.stringify({email, password}),
            headers: Service.getHeader(),
            method: 'POST'
        })
            
        return await response.json()
    },
    register: async function(form) {
        const response = await fetch(`${Service.baseUrl}/api/auth/signup`, {
            body: JSON.stringify(form),
            headers: Service.getHeader(),
            method: 'POST'
        })
            
        return await response.json()
    },
    logout: async function() {
        const response = await fetch(`${Service.baseUrl}/api/auth/logout`, {
            headers: Service.getAuthHeader(),
            method: 'POST'
        })

        return await response.json()
    }

}

export default AuthApi