import Service from "./Service"


const OrderApi = {

    getOrders: async function(page) {
        const response = await fetch(`${Service.baseUrl}/api/bill/list?page=${page}`, {
            headers: Service.getAuthHeader()
        })
            
        return await response.json()
    },
    getOrder: async function(bill_id) {
        const response = await fetch(`${Service.baseUrl}/api/bill/detail/${bill_id}`, {
            headers: Service.getAuthHeader()
        })
        return await response.json()
    },
    getPayToken: async function(bill_id) {
        const response = await fetch(`${Service.baseUrl}/api/bill/token/${bill_id}`, {
            headers: Service.getAuthHeader()
        })
        return await response.json()
    },
    pay: async function(bill_id, payToken) {
        const response = await fetch(`${Service.baseUrl}/api/bill/pay/${bill_id}`, {
            headers: Service.getAuthHeader(),
            body: JSON.stringify({payToken}),
            method: 'POST'
        })
        return await response.json()
    }
}

export default OrderApi