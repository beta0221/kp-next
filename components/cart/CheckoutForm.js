import { useState, useEffect, useContext } from 'react'
import { StarIcon } from '@heroicons/react/24/outline'
import { map, find, propEq, forEach, isNil } from 'ramda';
import CityCountyData from './CityCountyData'
import Select from 'react-select';
import KartContext from 'utilities/KartContext'

function CheckoutForm() {

    const kartContext = useContext(KartContext)

    // 被選區域
    const [district, setDistrict] = useState(null)
    // 被選縣市
    const [city, setCity] = useState(null)
    // 被選縣市的相依區域
    const [districts, setDistricts] = useState([])
    // 發票類型
    const [receiptType, setReceiptType] = useState(2)
    // 是否為二連
    const [isReceiptTypeTwo, setIsReceiptTypeTwo] = useState(true)

    const [checkoutForm, setCheckoutForm] = useState({
        ship_name: null,
        ship_gender: null,
        ship_email: null,
        ship_phone: null,
        ship_county: null,
        ship_district: null,
        ship_address: null,
        ship_receipt: 2,
        ship_three_id: null,
        ship_three_company: null,
        ship_memo: null,
        bonus: 0,
        ship_pay_by: null
    })

    const handleFormChange = ((key, value) => {
        let _form = Object.assign({}, checkoutForm)
        _form[key] = value
        setCheckoutForm(_form)
    }) 

    // city 改變對應動作
    useEffect(() => {
        if(!isNil(city)) setDistricts(districtOpts(city))
        handleFormChange('ship_county', city)
    }, [city]);

    // district 改變對應動作
    useEffect(() => {
        handleFormChange('ship_district', district)
    }, [district]);

    // city change 事件處理
    const handleCityChange = e => {
        setDistrict(null)
        setCity(e.value)
    }

    // selectedCity
    const selectedCity = (cityName) => ({ value: cityName, label: isNil(cityName) ? '請選擇縣市' : cityName })
    // selectedDistrict
    const selectedDistrict = (districtName) => ({ value: districtName, label: isNil(districtName) ? '請選擇地區' : districtName })
    // 當前縣市選項
    const cities = () => map((city) => ({ value: city.CityName, label: city.CityName }), CityCountyData);
    // 當前區域選項
    const findDistricts = (cityName) => find(propEq(cityName, 'CityName'))(CityCountyData)?.AreaList
    // 區域選項 (符合下拉式選單的格式)
    const districtOpts = (cityName) => map((d) => ({ value: d.AreaName, label: d.AreaName, zip: d.ZipCode }), findDistricts(cityName))

    // 發票 change 事件處理
    const handleReceiptChange = (e => {
        setReceiptType(e.value)
        handleFormChange('ship_receipt', e.value)
    })
    // 發票種類 選項
    const receiptTypes = [
        {value: 2, label: '二連'},
        {value: 3, label: '三連'}
    ]
    // selectedReceiptType
    const selectedReceiptType = () => find(propEq(receiptType, 'value'))(receiptTypes)
    
    // receiptType 改變對應動作
    useEffect(() => {
        setIsReceiptTypeTwo(receiptType == 2)
    }, [receiptType]);

    // 檢查 紅利
    const checkBonus = (e => {
        let bonus = checkoutForm.bonus
        let max = kartContext.user?.bonus ?? 0
        if (bonus > max) {
            bonus = max
        } else if (bonus % 50 != 0) {
            bonus = bonus - (bonus % 50);
        } else if (bonus / 50 > kartContext.checkoutTotal) {
            bonus = kartContext.checkoutTotal * 50
        }
        handleFormChange('bonus', bonus)
    })

    return (
        <>

            <form>
                <div className="space-y-12">

                    <div className="border-b border-gray-900/10 pb-12">
                        {/* <h2 className="text-base font-semibold leading-7 text-gray-900">{kartContext.checkoutTotal}</h2> */}
                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}

                        <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="first-name" className="inline-block text-sm font-medium leading-6 text-gray-900">
                                    收件人
                                </label>
                                <StarIcon className="mx-1 inline-block align-top h-5 w-5 text-red-400" aria-hidden="true" />
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        placeholder="收件人"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={checkoutForm.ship_name}
                                        onChange={e => {handleFormChange('ship_name', e.target.value)}}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">

                                <div className="flex mt-8 gap-x-3">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="gender-male"
                                            name="gender"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            value={1}
                                            onChange={e => handleFormChange('ship_gender', e.target.value)}
                                        />
                                        <label htmlFor="gender-male" className="block text-sm font-medium leading-6 text-gray-900">
                                            先生
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="gender-female"
                                            name="gender"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            value={2}
                                            onChange={e => handleFormChange('ship_gender', e.target.value)}
                                        />
                                        <label htmlFor="gender-female" className="block text-sm font-medium leading-6 text-gray-900">
                                            小姐
                                        </label>
                                    </div>


                                </div>
                            </div>

                            <div className="sm:col-span-3 sm:col-start-1">
                                <label htmlFor="email" className="inline-block text-sm font-medium leading-6 text-gray-900">
                                    E-mail
                                </label>
                                <StarIcon className="mx-1 inline-block align-top h-5 w-5 text-red-400" aria-hidden="true" />
                                <label className='text-xs'>
                                    (電子發票將寄送至此信箱)
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="E-mail"
                                        className="block w-full rounded-md border-0 py-1.5 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={checkoutForm.ship_email}
                                        onChange={e => {handleFormChange('ship_email', e.target.value)}}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3 sm:col-start-1">
                                <label htmlFor="phone" className="inline-block text-sm font-medium leading-6 text-gray-900">
                                    聯絡電話
                                </label>
                                <StarIcon className="mx-1 inline-block align-top h-5 w-5 text-red-400" aria-hidden="true" />
                                <div className="mt-2">
                                    <input
                                        name="phone"
                                        type="phone"
                                        placeholder="聯絡電話"
                                        className="block w-full rounded-md border-0 py-1.5 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={checkoutForm.ship_phone}
                                        onChange={e => {handleFormChange('ship_phone', e.target.value)}}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label className="inline-block text-sm font-medium leading-6 text-gray-900">
                                    地址
                                </label>
                                <StarIcon className="mx-1 inline-block align-top h-5 w-5 text-red-400" aria-hidden="true" />
                                <div className="mt-2">
                                    <Select
                                        name="county"
                                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        placeholder='選擇城市'
                                        options={cities()}
                                        onChange={handleCityChange}
                                        value={selectedCity(city)}
                                    />
                                    
                                </div>
                            </div>

                            <div className="sm:col-span-2">

                                <div className="mt-8">
                                    <Select
                                        name="district"
                                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        placeholder='選擇地區'
                                        options={districts}
                                        onChange={(e) => setDistrict(e.value)}
                                        value={selectedDistrict(district)}
                                    />
                                    
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="地址"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={checkoutForm.ship_address}
                                        onChange={e => {handleFormChange('ship_address', e.target.value)}}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-1 sm:col-start-1">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    發票
                                </label>
                                <div className="mt-2">
                                    <Select 
                                        className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        options={receiptTypes}
                                        onChange={handleReceiptChange}
                                        value={selectedReceiptType()}
                                    />
                                    
                                </div>
                            </div>

                            <div className={"sm:col-span-1 " + (isReceiptTypeTwo ? 'hidden' : '')}>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    統一編號
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        placeholder="統一編號"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={e => handleFormChange('ship_three_id', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={"sm:col-span-2 " + (isReceiptTypeTwo ? 'hidden' : '')}>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    公司名稱
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        placeholder="公司名稱"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={e => handleFormChange('ship_three_company', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4 sm:col-start-1">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    備註
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        rows={2}
                                        placeholder='備註'
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                        value={checkoutForm.ship_memo}
                                        onChange={e => {handleFormChange('ship_memo', e.target.value)}}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    使用紅利（可用：{(kartContext.user ? kartContext.user.bonus : 0)}）
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        placeholder="使用紅利"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={e => {handleFormChange('bonus', e.target.value)}}
                                        value={checkoutForm.bonus}
                                        onBlur={checkBonus}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4 sm:col-start-1">


                                <label className="inline-block text-sm font-medium leading-6 text-gray-900">
                                    付款方式
                                </label>
                                <StarIcon className="mx-1 inline-block align-top h-5 w-5 text-red-400" aria-hidden="true" />

                                <div className="flex justify-between mt-2 gap-x-3 rounded-md border-0 ring-1 ring-inset ring-gray-600 py-1.5 px-2">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="pay_by_credit"
                                            name="ship_pay_by"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            value='CREDIT'
                                            onChange={e => handleFormChange('ship_pay_by', e.target.value)}
                                        />
                                        <label htmlFor='pay_by_credit' className="block text-sm font-medium leading-6 text-gray-900">
                                            信用卡
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="pay_by_atm"
                                            name="ship_pay_by"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            value='ATM'
                                            onChange={e => handleFormChange('ship_pay_by', e.target.value)}
                                        />
                                        <label htmlFor="pay_by_atm" className="block text-sm font-medium leading-6 text-gray-900">
                                            ATM
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="pay_by_cod"
                                            name="ship_pay_by"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            value='cod'
                                            onChange={e => handleFormChange('ship_pay_by', e.target.value)}
                                        />
                                        <label htmlFor="pay_by_cod" className="block text-sm font-medium leading-6 text-gray-900">
                                            貨到付款
                                        </label>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>


                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        取消
                    </button>
                    <div
                        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        onClick={e => {
                            console.log(checkoutForm)
                        }}
                    >
                        送出訂單
                    </div>
                </div>
            </form>
        </>
    );
}

export default CheckoutForm;