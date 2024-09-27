import Service from "./Service"


const AuthApi = {

    getUser: async function() {
        const response = await fetch(`${Service.baseUrl}/api/auth/user`, {
            headers: Service.getAuthHeader()
        })
            
        return await response.json()
    }

}

export default AuthApi