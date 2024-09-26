import { Fragment, useState, useEffect } from 'react'
import MainTemplate from "components/template/MainTemplate"
import KartContext from 'utilities/KartContext';
import Cart from 'components/cart/Cart'
import CheckoutForm from 'components/cart/CheckoutForm';
import authHeaders from 'utilities/Request';


function kart() {

    const [cartItems, setCartItems] = useState([])


    // 載入購物車
    const reloadCartItems = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/kart/items`, {
            headers: authHeaders()
        })
        let _cartItems = await res.json()
        _cartItems = _cartItems.map((item) => {
            item.quantity = 1
            return item
        })
        setCartItems(_cartItems)
    }

    // 更新數量
    const updateQuantity = (slug, quantity) => {
        let item = cartItems.find((_item) => _item.slug == slug)
        item.quantity = parseInt(quantity)

        const updatedCartItems = cartItems.map(_item => {
            return (_item.slug == item.slug) ? item : _item
        })

        setCartItems(updatedCartItems)
    }

    useEffect(() => {
        reloadCartItems()
    }, [])

    return (
        <KartContext.Provider value={{reloadCartItems, updateQuantity}}>
            <MainTemplate>
                <div className='container mx-auto max-w-3xl py-4 px-4 sm:py-16 sm:px-8'>
                    <h1>購物車</h1>

                    <Cart cartItems={cartItems} reloadCartItems={reloadCartItems} />

                    <h1>訂購人資訊</h1>
                    <CheckoutForm />
                </div>  

            </MainTemplate>
        </KartContext.Provider>
    );
}

export default kart;