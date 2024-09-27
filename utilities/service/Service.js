const Service =  {
       
    baseUrl: process.env.NEXT_PUBLIC_API_HOST,

    getAuthHeader: function() {
        return {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

}

export default Service