import MainTemplate from "components/template/MainTemplate";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import OrderApi from "utilities/service/OrderApi"

function detail() {

    const searchParams = useSearchParams()

    const [bill, setBill] = useState({})
    const [products, setProducts] = useState([])
    const [cardInfo, setCartInfo] = useState({})
    const [atmInfo, setAtmInfo] = useState({})

    useEffect(() => {
        const bill_id = searchParams.get('bill_id')
        if (bill_id == undefined) { return }
        OrderApi.getOrder(bill_id)
            .then((res) => {
                setBill(res.bill)
                setProducts(res.products)
                setCartInfo(res.cardInfo)
                setAtmInfo(res.atmInfo)
            })
    }, [searchParams])

    return (
        <MainTemplate>
            <div className='container mx-auto py-4 px-4 sm:py-16 sm:px-8'>


                <div>
                    <div className="px-4 sm:px-0">
                        <h3 className="text-xl font-semibold text-gray-900">訂單編號：{bill.bill_id}</h3>
                        <p className="mt-1 max-w-2xl text-sm/6 text-gray-900">狀態： <span className={(bill.isShipmentComplete) && "text-green-700"}>{bill.overAllStatus}</span></p>
                    </div>

                    <div className="mt-6 border-t border-gray-100">

                        <dl className="divide-y divide-gray-100">

                            {(Object.keys(cardInfo).length > 0) &&
                                <>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2 bg-slate-300">
                                        <dt className="text-xl font-medium text-gray-900">信用卡資訊</dt>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                        <dt className="text-sm/6 font-medium text-gray-900">卡片末四碼</dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{cardInfo.Card4No}</dd>
                                    </div>
                                </>
                            }

                            {(Object.keys(atmInfo).length > 0) &&
                                <>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2 bg-slate-300">
                                        <dt className="text-xl font-medium text-gray-900">ATM轉帳資訊</dt>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                        <dt className="text-sm/6 font-medium text-gray-900">銀行代碼</dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{atmInfo.BankCode}</dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                        <dt className="text-sm/6 font-medium text-gray-900">虛擬帳號</dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{atmInfo.vAccount}</dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                        <dt className="text-sm/6 font-medium text-gray-900">繳費期限</dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{atmInfo.ExpireDate}</dd>
                                    </div>
                                </>
                            }

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2 bg-slate-300">
                                <dt className="text-xl font-medium text-gray-900">收貨人</dt>
                            </div>

                            {(bill.ship_name != "*" && bill.ship_phone != "*") &&
                                <>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                        <dt className="text-sm/6 font-medium text-gray-900">姓名</dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{bill.ship_name}</dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                        <dt className="text-sm/6 font-medium text-gray-900">電話</dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{bill.ship_phone}</dd>
                                    </div>
                                </>
                            }

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                <dt className="text-sm/6 font-medium text-gray-900">信箱</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{bill.ship_email}</dd>
                            </div>

                            {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                <dt className="text-sm/6 font-medium text-gray-900">物流</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">冷凍宅配</dd>
                            </div> */}

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                <dt className="text-sm/6 font-medium text-gray-900">寄送地址</dt>
                                {(bill.ship_name != "*" && bill.ship_phone != "*") &&
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{bill.address}</dd>
                                }

                                {(bill.ship_name == "*" && bill.ship_phone == "*") &&
                                    <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                            {JSON.parse(bill.address).map((target) => (
                                                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                                                    <div className="flex w-0 flex-1 items-center">

                                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                            <span className="truncate font-medium">{target.name}</span>
                                                            <span className="flex-shrink-0 text-gray-400">地址：{target.address} ; 電話：{target.phone}</span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4 flex-shrink-0">
                                                        <span className="truncate text-gray-600 font-medium">{target.quantity}</span>

                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </dd>
                                }



                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2 bg-slate-300">
                                <dt className="text-xl font-medium text-gray-900">付款資訊</dt>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                <dt className="text-sm/6 font-medium text-gray-900">繳費方式</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{bill.pay_by}</dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                <dt className="text-sm/6 font-medium text-gray-900">繳費狀態</dt>
                                <dd className={`mt-1 text-sm/6 ${(bill.isStatusComplete) ? 'text-green-700' : 'text-red-500'} sm:col-span-2 sm:mt-0`}>{bill.status}</dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                <dt className="text-sm/6 font-medium text-gray-900">發票</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{bill.format_ship_receipt}</dd>
                            </div>
                            {(bill.ship_receipt == "3" || bill.ship_receipt == 3) &&
                                <>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                        <dt className="text-sm/6 font-medium text-gray-900">公司抬頭</dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{bill.ship_three_id}</dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                        <dt className="text-sm/6 font-medium text-gray-900">統一編號</dt>
                                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{bill.ship_three_company}</dd>
                                    </div>
                                </>
                            }

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                <dt className="text-sm/6 font-medium text-gray-900">備註</dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {bill.ship_memo}
                                </dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2 bg-slate-300">
                                <dt className="text-xl font-medium text-gray-900">總額</dt>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                <dt className="text-sm/6 font-medium text-gray-900">商品</dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">

                                    <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        {products.map((product) => (
                                            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                                                <div className="flex w-0 flex-1 items-center">

                                                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                        <span className="truncate font-medium">{product.name}</span>
                                                        <span className="flex-shrink-0 text-gray-400">${product.price} x {product.quantity}</span>
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex-shrink-0">
                                                    <span className="truncate text-indigo-600 font-medium">${parseInt(product.price) * parseInt(product.quantity)}</span>

                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                </dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                <dt className="text-sm/6 font-medium text-gray-900">紅利折扣</dt>
                                <dd className="mt-1 text-sm/6 text-red-500 sm:col-span-2 sm:mt-0">-{bill.bonus_use}</dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
                                <dt className="text-sm/6 font-medium text-gray-900">總金額</dt>
                                <dd className="mt-1 text-xl text-indigo-600 sm:col-span-2 sm:mt-0">${bill.price}</dd>
                            </div>

                        </dl>

                    </div>
                </div>

            </div>
        </MainTemplate>
    );
}

export default detail;