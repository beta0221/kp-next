import { useContext } from 'react'
import Image from 'next/image'
import NavbarContext from 'utilities/NavbarContext'
import KartContext from 'utilities/KartContext'
import { XMarkIcon } from '@heroicons/react/24/outline'
import authHeaders from 'utilities/Request'

function Cart({ cartItems, reloadCartItems }) {

    const navbarContext = useContext(NavbarContext)
    const kartContext = useContext(KartContext)

    // 刪除商品
    async function removeItem(productId) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/kart/remove/${productId}`, {
            headers: authHeaders(),
            method: 'POST'
        })
        const data = await res.json()
        navbarContext.reloadCartItems()
        reloadCartItems()
    }

    // 數量 變更
    function handleChange(slug, quantity) {
        kartContext.updateQuantity(slug, quantity)
    }

    return (
        <>
            <ul role="list" className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between gap-x-6 py-5">

                        <div className="flex min-w-0 gap-x-4">
                            {/* <div className='h-12 w-12 flex-none rounded-full bg-gray-50'>
                                <Image fill={true} loader={({src}) => {return src}} src={item.imgUrl} alt={item.name} />
                            </div> */}
                            <img alt="" src={item.imgUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                            
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.price}</p>
                            </div>
                        </div>

                        <div>

                            <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none">
                                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                        數量
                                    </label>
                                </div>
                                <div className="flex-none">
                                    <input
                                        min={1}
                                        type="number"
                                        value={item.quantity}
                                        className="w-12 rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => handleChange(item.slug, e.target.value)}
                                    />
                                </div>
                                <div className="flex-none">
                                    <button type="button" onClick={() => removeItem(item.id)}
                                        className="rounded-md text-gray-800 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white" >
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Cart;