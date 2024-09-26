import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/24/outline'
import { map, find, propEq, forEach, isNil } from 'ramda';
import CityCountyData from './CityCountyData'
import Select from 'react-select';

function CheckoutForm() {

    // 被選區域
    const [district, setDistrict] = useState(null)
    // 被選縣市
    const [city, setCity] = useState(null)
    // 被選縣市的相依區域
    const [districts, setDistricts] = useState([])

    const [checkoutForm, setCheckoutForm] = useState({
        name: null,
        gender: null,
        email: null
    })


    // city 改變對應動作
    useEffect(() => {
        if(!isNil(city)) setDistricts(districtOpts(city))
    }, [city]);

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

    return (
        <>

            <form>
                <div className="space-y-12">

                    <div className="border-b border-gray-900/10 pb-12">
                        {/* <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2> */}
                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}

                        <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="first-name" className="inline-block text-sm font-medium leading-6 text-gray-900">
                                    收件人
                                </label>
                                <StarIcon className="mx-1 inline-block align-top h-5 w-5 text-red-400" aria-hidden="true" />
                                <div className="mt-2">
                                    <input
                                        id="first-name"
                                        name="first-name"
                                        type="text"
                                        autoComplete="given-name"
                                        placeholder="收件人"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">

                                <div className="flex mt-8 gap-x-3">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="gender-mail"
                                            name="gender"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="gender-mail" className="block text-sm font-medium leading-6 text-gray-900">
                                            先生
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="gender-femail"
                                            name="gender"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="gender-femail" className="block text-sm font-medium leading-6 text-gray-900">
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
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="E-mail"
                                        className="block w-full rounded-md border-0 py-1.5 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                        id="phone"
                                        name="phone"
                                        type="phone"
                                        autoComplete="phone"
                                        placeholder="聯絡電話"
                                        className="block w-full rounded-md border-0 py-1.5 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                        id="county"
                                        name="county"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                                        id="district"
                                        name="district"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        placeholder='選擇地區'
                                        options={districts}
                                        onChange={(e) => setDistrict(e.value)}
                                        value={selectedDistrict(district)}
                                    />
                                    
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <div className="">
                                    <input
                                        id="street-address"
                                        name="street-address"
                                        type="text"
                                        autoComplete="street-address"
                                        placeholder="地址"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-1 sm:col-start-1">
                                <label htmlFor="envoice-type" className="block text-sm font-medium leading-6 text-gray-900">
                                    發票
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="envoice-type"
                                        name="envoice-type"
                                        autoComplete="envoice-type"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value={2}>二連</option>
                                        <option value={3}>三聯</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-1">
                                <label htmlFor="envoice-type" className="block text-sm font-medium leading-6 text-gray-900">
                                    統一編號
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="street-address"
                                        name="street-address"
                                        type="text"
                                        autoComplete="street-address"
                                        placeholder="統一編號"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 ">
                                <label htmlFor="envoice-type" className="block text-sm font-medium leading-6 text-gray-900">
                                    公司名稱
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="street-address"
                                        name="street-address"
                                        type="text"
                                        autoComplete="street-address"
                                        placeholder="公司名稱"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4 sm:col-start-1">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    備註
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={2}
                                        placeholder='備註'
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="envoice-type" className="block text-sm font-medium leading-6 text-gray-900">
                                    使用紅利（可用：5000）
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="street-address"
                                        name="street-address"
                                        type="text"
                                        autoComplete="street-address"
                                        placeholder="使用紅利"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4 sm:col-start-1">


                                <label htmlFor="country" className="inline-block text-sm font-medium leading-6 text-gray-900">
                                    付款方式
                                </label>
                                <StarIcon className="mx-1 inline-block align-top h-5 w-5 text-red-400" aria-hidden="true" />

                                <div className="flex justify-between mt-2 gap-x-3 rounded-md border-0 ring-1 ring-inset ring-gray-600 py-1.5 px-2">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="gender-mail"
                                            name="gender"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="gender-mail" className="block text-sm font-medium leading-6 text-gray-900">
                                            信用卡
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="gender-femail"
                                            name="gender"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="gender-femail" className="block text-sm font-medium leading-6 text-gray-900">
                                            ATM
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="gender-femail"
                                            name="gender"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="gender-femail" className="block text-sm font-medium leading-6 text-gray-900">
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
                    <button
                        type="submit"
                        className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        送出訂單
                    </button>
                </div>
            </form>
        </>
    );
}

export default CheckoutForm;