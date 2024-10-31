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
    }
}

export default OrderApi