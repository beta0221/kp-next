

import { Fragment, useState, useEffect } from 'react'
import MainTemplate from "components/template/MainTemplate"
import OrderApi from "utilities/service/OrderApi";
import Pagination from 'components/pagination/Pagination';

function bill() {

    const [page, setPage] = useState(1)
    const [orders, setOrders] = useState([])
    const [lastPage, setLastPage] = useState(0)

    useEffect(() => {
        getOrder(page)
    }, [page])

    const getOrder = (page) => {
        OrderApi.getOrders(page).then(res => {
            setOrders(res.data)
            setLastPage(res.last_page)
        })
    }


    return (
        <MainTemplate>
            <div className='container mx-auto py-4 px-4 sm:py-16 sm:px-8'>
                <h1 className='mb-4'>我的訂單</h1>

                <div class="relative overflow-x-auto mb-4">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    日期
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    訂單編號
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    紅利折扣
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    總價
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    付款方式
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    付款狀態
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    出貨狀態
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    -
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {orders.map((order) => (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {order.created_at}
                                    </th>
                                    <td class="px-6 py-4 text-blue-600">
                                        <a href='/'>{order.bill_id}</a>
                                    </td>
                                    <td class="px-6 py-4 text-red-600">
                                        {order.bonus_use}
                                    </td>
                                    <td class="px-6 py-4 text-blue-600">
                                        {order.price}
                                    </td>
                                    <td class="px-6 py-4">
                                        {order.pay_by}
                                    </td>
                                    <td class={`px-6 py-4 ${(order.isStatusComplete) ? 'text-green-700' : ''}`}>
                                        {order.status}
                                    </td>
                                    <td class={`px-6 py-4 ${(order.isShipmentComplete) ? 'text-green-700' : ''}`}>
                                        {order.shipment}
                                    </td>
                                    <td class="px-6 py-4">
                                        {
                                            (order.cancelable) ?
                                            <button className='btn btn-red'>取消訂單</button> :
                                            <span>-</span>
                                        }
                                    </td>
                                    
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                <Pagination 
                    page={page}
                    setPage={setPage}
                    lastPage={lastPage} />

            </div>

        </MainTemplate>
    );
}

export default bill;