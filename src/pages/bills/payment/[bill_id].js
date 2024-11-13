import MainTemplate from "components/template/MainTemplate";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import OrderApi from "utilities/service/OrderApi";

function Payment() {

    const searchParams = useSearchParams()

    const [billId, setBillId] = useState("")

    useEffect(() => {
        const bill_id = searchParams.get('bill_id')
        if (bill_id == undefined) { return }
        setBillId(bill_id)
        OrderApi.getPayToken(bill_id)
            .then((res) => {
                if (res.error) {
                    ErrHandle(res.error)
                    return
                }
                if (!res.token) { return }
                ECPay.initialize('Stage', 1, (errMsg) => {
                    try {
                        ECPay.createPayment(res.token, ECPay.Language.zhTW, function (errMsg) {
                            console.log('Callback Message: ' + errMsg);
                            if (errMsg != null) { ErrHandle(errMsg); }
                        });
                        $('#Language').val(ECPay.Language.zhTW);
                    } catch (err) {
                        ErrHandle(err);
                    }
                })
            })
    }, [searchParams])

    const pay = () => {
        try {
            ECPay.getPayToken(function (paymentInfo, errMsg) {
                //console.log("response => getPayToken(paymentInfo, errMsg):", paymentInfo, errMsg);
                if (errMsg != null) {
                    ErrHandle(errMsg);
                    return;
                };

                console.log('PayToken: ' + paymentInfo.PayToken);
                OrderApi.pay(billId, paymentInfo.PayToken)
                    .then((res) => {
                        console.log(res)
                        if(res.url == undefined) { return }
                        window.location.href = res.url
                    })
                return true;
            });
        } catch (err) {
            ErrHandle(err);
        }
    }

    const ErrHandle = (strErr) => {

        if (strErr != null) {
            $('#ECPayPayment').append('<div style="text-align: center;"><label style="color: red;">' + strErr + '</label></div>');
            console.log(strErr);
        } else {
            $('#ECPayPayment').append('<div style="text-align: center;"><label style="color: red;">Token取得失敗</label></div>');
            console.log('Wrong');
        }

        //$('#btnPay').hide();
    }

    return (
        <>
            <MainTemplate>
                <div className='container mx-auto py-4 px-4 sm:py-16 sm:px-8'>

                    <div id="ECPayPayment"></div>

                    <div className="mt-2">
                        <form id="PayProcess">
                            <div className="text-center">
                                <input id="PaymentType" name="PaymentType" type="hidden" value="" />
                                <div
                                    className=" btn btn-blue inline-block"
                                    onClick={pay}
                                >
                                    確認付款
                                </div>
                            </div>
                            <br />
                        </form>
                    </div>
                </div>


            </MainTemplate>
            <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
            <script src={process.env.NEXT_PUBLIC_ECPAY_SDK}></script>
        </>
    );
}

export default Payment;