


function ProductSelectorCell({ product, index }) {

    const addToCart = async (productId) => {

        let body = { 'product_id': productId }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/kart/add`, {
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Accept': 'application/json'
            },
            method: 'POST'
        })
        const data = await res.json()
        
    }

    return (
        <div className={((index % 2 == 0) ? "bg-gray-50" : "bg-white") + " px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"}>

            <div className="text-sm font-medium text-gray-500 sm:col-span-5 py-2">{product.name}</div>
            <div onClick={() => addToCart(product.id)}
                className="text-sm text-white text-center bg-amber-400 hover:bg-amber-300 rounded-md py-2 cursor-pointer">
                加入
            </div>
        </div>
    );
}

export default ProductSelectorCell;