import MainTemplate from "components/template/MainTemplate";
import BillDisplay from "components/bill/BillDisplay";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import OrderApi from "utilities/service/OrderApi";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from 'next/link'

function Complete() {

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

            <div className='container mx-auto py-4 px-4 sm:py-8 sm:px-8'>

                <div className="bg-white py-6 sm:py-6">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">

                            <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
                                感謝您的購買~
                            </p>

                            <div className="text-center py-2 mt-6">
                                <CheckCircleIcon class="h-12 w-12 text-green-600 inline-block" />
                            </div>

                            <p className="mt-6 text-lg/8 text-gray-600">
                                我們衷心感謝您購買我們的產品。
                            </p>
                            <p className="text-lg/8 text-gray-600">
                                若您對此次交易有任何問題，請隨時<Link href="/contactUS" className="text-blue-500">寫信給我們</Link>。
                            </p>

                        </div>
                    </div>
                </div>

                <BillDisplay
                    bill={bill}
                    products={products}
                    cardInfo={cardInfo}
                    atmInfo={atmInfo}
                />

                <div className="text-center mt-12 mb-12">
                    <Link href="/bills"
                        className="font-bold py-2 px-10 rounded cursor-pointer btn-green inline-block">
                        我的訂單
                    </Link>
                </div>

            </div>

        </MainTemplate>
    );
}

export default Complete;