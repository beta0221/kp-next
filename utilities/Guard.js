
const Guard = {
    authOnly: function() {
        const isAuthenticated = (localStorage.getItem('token') !== null)
        if (!isAuthenticated) { 
            window.location.href = `/login?redirect=${window.location.pathname}`
        }
    },
    guestOnly: function() {
        const isAuthenticated = (localStorage.getItem('token') !== null)
        if (isAuthenticated) { 
            window.location.href = `/`
        }
    }

}

export default Guard