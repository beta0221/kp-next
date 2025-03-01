import { Fragment, useState, useEffect } from 'react'
import MainTemplate from "components/template/MainTemplate"
import KartContext from 'utilities/KartContext';
import Cart from 'components/cart/Cart'
import CheckoutForm from 'components/cart/CheckoutForm';
import AuthApi from 'utilities/service/AuthApi';
// import AuthGuard from 'components/AuthGuard';
import CartApi from 'utilities/service/CartApi';
import Guard from 'utilities/Guard';


function Kart() {

    const [cartItems, setCartItems] = useState([])

    const [user, setUser] = useState(null)

    const [checkoutTotal, setCheckoutTotal] = useState(null)

    const [cartConfirmed, setCartConfirmed] = useState(false)

    // 載入購物車
    const reloadCartItems = async () => {
        CartApi.getItems()
            .then(_cartItems => {
                _cartItems = _cartItems.map((item) => {
                    item.quantity = 1
                    return item
                })
                setCartItems(_cartItems)
            })
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
        Guard.authOnly()

        reloadCartItems()
        AuthApi.getUser().then(user => {
            setUser(user)
        })
    }, [])

    useEffect(() => {
        const _checkoutTotal = cartItems.map(_item => {
            return _item.quantity * _item.price
        }).reduce((acc, cur) => {
            return acc + cur
        }, 0)
        setCheckoutTotal(_checkoutTotal)
    }, [cartItems])

    return (
        <KartContext.Provider value={
            {
                cartItems,
                reloadCartItems,
                updateQuantity,
                user,
                checkoutTotal,
                cartConfirmed,
                setCartConfirmed
            }
        }>
            <MainTemplate>
                <div className='container mx-auto max-w-3xl py-4 px-4 sm:py-16 sm:px-8'>
                    <h1>購物車</h1>

                    <Cart />
                    <CheckoutForm />
                </div>  

            </MainTemplate>
        </KartContext.Provider>
    );
}

export default Kart;