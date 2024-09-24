import { Fragment, useState, useEffect } from 'react'
import MainTemplate from "components/template/MainTemplate"
import KartContext from 'utilities/KartContext';
import Cart from 'components/Cart'
import CheckoutForm from 'components/CheckoutForm';
import authHeaders from 'utilities/Request';


function kart() {

    const [cartItems, setCartItems] = useState([])


    // 載入購物車
    const reloadCartItems = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/kart/items`, {
            headers: authHeaders()
        })
        const _cartItems = await res.json()
        setCartItems(_cartItems)
    }

    useEffect(() => {
        reloadCartItems()
    }, [])

    return (
        <KartContext.Provider value={{reloadCartItems}}>
            <MainTemplate>
                <div className='container mx-auto max-w-3xl py-4 px-4 sm:py-16 sm:px-8'>
                    <h1>購物車</h1>

                    <Cart cartItems={cartItems} reloadCartItems={reloadCartItems} />
                    <CheckoutForm />
                </div>  

            </MainTemplate>
        </KartContext.Provider>
    );
}

export default kart;