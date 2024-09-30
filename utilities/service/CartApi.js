import Service from "./Service"

const CartApi = {

    checkout: async function(form) {
        const response = await fetch(`${Service.baseUrl}/api/bill/checkout`, {
            body: JSON.stringify(form),
            headers: Service.getAuthHeader(),
            method: 'POST'
        })

        if (response.status == 422) {
            const errorResponse = await response.json()
            throw new Error(JSON.stringify(errorResponse));
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json()
    }

}

export default CartApi