import MainTemplate from "components/template/MainTemplate";
import BillDisplay from "components/bill/BillDisplay";
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
                <BillDisplay
                    bill={bill}
                    products={products}
                    cardInfo={cardInfo}
                    atmInfo={atmInfo}
                />
            </div>
        </MainTemplate>
    );
}

export default detail;