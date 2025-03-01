import { useState, useEffect, useContext } from 'react'
import { StarIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import { map, find, propEq, forEach, isNil } from 'ramda';
import CityCountyData from './CityCountyData'
import Select from 'react-select';
import KartContext from 'utilities/KartContext'
import CartApi from 'utilities/service/CartApi';
import AuthApi from 'utilities/service/AuthApi';
import styles from './CheckoutForm.module.css';
import FormValidator from 'utilities/FormValidator';

function CheckoutForm() {

    const kartContext = useContext(KartContext)

    // 是否使用 常用地址
    const [useFavoriteAddress, setUseFavoriteAddress] = useState(false)
    // 可選擇 常用地址
    const [favoriteAddresses, setFavoriteAddresses] = useState([])
    // 被選 常用地址
    const [favoriteAddress, setFavoriteAddress] = useState({value: '', label: '請選擇常用地址'})
    // 常用地址 選項
    const option_favoriteAddresses = () => map((address) => ({value: address.id, label: address.address}), favoriteAddresses)
    // 常用地址 change 事件處理
    const handleFavoriteAddressChange = (id => {
        let address = favoriteAddresses.find(element => element.id == id)
        setFavoriteAddress({value: address.id, label: address.address})
    })
    // 是否使用常用地址 change 事件處理
    const handleUseFavoriteAddressChange = (use => {
        setUseFavoriteAddress(use)
        let _validations = Object.assign({}, validations)
        if (use) {
            delete _validations['ship_county']
            delete _validations['ship_district']
            delete _validations['ship_address']
        } else {
            _validations['ship_county'] = [{ type: 'required' }]
            _validations['ship_district'] = [{ type: 'required' }]
            _validations['ship_address'] = [{ type: 'required' }]
        }
        setValidations(_validations)
    })
    // 取得 常用地址
    useEffect(() => {
        AuthApi.getAddresses()
            .then(addresses => { 
                setFavoriteAddresses(addresses)       
            })
    }, [])
    // 選擇第一個常用地址
    useEffect(() => {
        let empty = favoriteAddresses.length == 0
        if (!empty) { handleFavoriteAddressChange(favoriteAddresses[0].id) }
        handleUseFavoriteAddressChange(!empty)
    }, [favoriteAddresses])
    

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
    // 表單資料
    const [checkoutForm, setCheckoutForm] = useState({
        ship_name: '',
        ship_gender: '',
        ship_email: '',
        ship_phone: '',
        carrier_id: 0,
        ship_county: '',
        ship_district: '',
        ship_address: '',
        add_favorite: false,
        ship_receipt: 2,
        ship_three_id: '',
        ship_three_company: '',
        ship_memo: '',
        bonus: 0,
        ship_pay_by: ''
    })

    // 表單規則
    const [validations, setValidations] = useState({
        ship_name: [{ type: 'required' }],
        ship_gender: [{ type: 'required' }],
        ship_email: [{ type: 'required' }, { type: 'email' }],
        ship_phone: [{ type: 'required' }],
        ship_county: [{ type: 'required' }],
        ship_district: [{ type: 'required' }],
        ship_address: [{ type: 'required' }],
        ship_pay_by: [{ type: 'required' }],
    })

    // 驗證錯誤資料
    const [errors, setErrors] = useState({})
    

    const handleFormChange = ((key, value) => {
        let _form = Object.assign({}, checkoutForm)
        _form[key] = value
        setCheckoutForm(_form)
    })

    // city 改變對應動作
    useEffect(() => {
        if (!isNil(city)) setDistricts(districtOpts(city))
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
    // 欄位是否錯誤
    const hasError = (name) => { return (name in errors) }
    // 欄位是否錯誤 className
    const hasErrorInput = (name) => { return (hasError(name) ? styles.errorInput : '') }
    // 提示錯誤 className
    const hasErrorMsg = (name) => { return hasError(name) ? '' : 'hidden' }
    // 提示錯誤
    const errorMsg = (name) => { return hasError(name) ? errors[name][0] : '' }

    // 發票 change 事件處理
    const handleReceiptChange = (e => {
        setReceiptType(e.value)
        handleFormChange('ship_receipt', e.value)
        let _validations = Object.assign({}, validations)
        if (e.value == 3) {
            _validations['ship_three_id'] = [{ type: 'required' }]
            _validations['ship_three_company'] = [{ type: 'required' }]
        } else {
            delete _validations['ship_three_id']
            delete _validations['ship_three_company']
        }
        setValidations(_validations)
    })
    // 發票種類 選項
    const receiptTypes = [
        { value: 2, label: '二連' },
        { value: 3, label: '三連' }
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

    // 上一步
    const preStep = (e) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            kartContext.setCartConfirmed(false)
        }, "500");
    }

    // 結帳
    const checkout = (e) => {

        const isValid = validateForm()
        if (!isValid) { return }
        
        const items = map((item) => ({
            slug: item.slug,
            quantity: item.quantity
        }), kartContext.cartItems) 

        let _checkoutForm = Object.assign({}, checkoutForm)
        _checkoutForm['items'] = items
        _checkoutForm['use_favorite_address'] = useFavoriteAddress
        _checkoutForm['favorite_address'] = favoriteAddress.value
        
        CartApi.checkout(_checkoutForm)
            .then(res => {
                console.log(res)
                if(!res.bill_id) { return }
                handleSuccessRedirect(res.bill_id)
            })
            .catch(error => {
                try {
                    const errorJson = JSON.parse(error.message); // 試圖將錯誤訊息解析為 JSON
                    handleValidationErrors(errorJson)
                } catch (parsingError) {
                    console.error('發生錯誤:', error.message); // 如果無法解析為 JSON，則顯示普通錯誤訊息
                }
            })
    }

    // 結帳成功後 導向
    const handleSuccessRedirect = (bill_id) => {
        console.log('結帳成功後 導向:' + bill_id)
        
        // { CREDIT, ATM, cod }
        switch (checkoutForm.ship_pay_by) {
            case "cod":
                window.location.href = `/bills/${bill_id}`
                break;
            default:
                window.location.href = `/bills/payment/${bill_id}`
                break;
        }
    }

    // 驗證 表單資料
    const validateForm = () => {

        const validator = new FormValidator(validations)
        const validationErrors = validator.validateForm(checkoutForm)
        
        if (Object.keys(validationErrors).length > 0) {
            handleValidationErrors(validationErrors)
            console.error(validationErrors)
            return false
        }

        handleValidationErrors({})
        return true
    }

    // 資料錯誤處理
    const handleValidationErrors = (errorJson) => {
        setErrors(errorJson)
    }

    return (
        <div className={`${kartContext.cartConfirmed ? '' : 'hidden'}`}>
            <h1>訂購人資訊</h1>
            <form>
                <div className="space-y-12">

                    <div className="border-b border-gray-900/10 pb-12">

                        <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="first-name" className="inline-block text-sm font-medium leading-6 text-gray-900">
                                    收件人
                                </label>
                                <StarIcon className="mx-1 inline-block align-top h-5 w-5 text-red-400" aria-hidden="true" />
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        placeholder="收件人"
                                        className={`${styles.input} ` + hasErrorInput('ship_name')}
                                        value={checkoutForm.ship_name}
                                        onChange={e => { handleFormChange('ship_name', e.target.value) }}
                                    />
                                    <span className={`${styles.errorMsg} ` + hasErrorMsg('ship_name')}>
                                        {errorMsg('ship_name')}
                                    </span>
                                </div>
                            </div>



                            <div className="sm:col-span-3">

                                <div className="flex mt-8 gap-x-3 h-9">
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
                                <div>
                                    <span className={`${styles.errorMsg} ${hasErrorMsg('ship_gender')}`}>
                                        {errorMsg('ship_gender')}
                                    </span>
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
                                        className={`${styles.input} ${hasErrorInput('ship_email')}`}
                                        value={checkoutForm.ship_email}
                                        onChange={e => { handleFormChange('ship_email', e.target.value) }}
                                    />
                                    <span className={`${styles.errorMsg} ${hasErrorMsg('ship_email')}`}>
                                        {errorMsg('ship_email')}
                                    </span>
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
                                        className={`${styles.input} ${hasErrorInput('ship_phone')}`}
                                        value={checkoutForm.ship_phone}
                                        onChange={e => { handleFormChange('ship_phone', e.target.value) }}
                                    />
                                    <span className={`${styles.errorMsg} ${hasErrorMsg('ship_phone')}`}>
                                        {errorMsg('ship_phone')}
                                    </span>
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label className="inline-block text-sm font-medium leading-6 text-gray-900">
                                    地址
                                </label>
                                <StarIcon className="mx-1 inline-block align-top h-5 w-5 text-red-400" aria-hidden="true" />
                            </div>

                            <div className={`${useFavoriteAddress ? '' : 'hidden'} sm:col-span-4 sm:col-start-1`}>
                                <Select
                                    name="favorite_address"
                                    placeholder='常用地址'
                                    options={option_favoriteAddresses()}
                                    className={`${styles.input}`}
                                    onChange={e => handleFavoriteAddressChange(e.value)}
                                    value={favoriteAddress}
                                />
                            </div>

                            <div className={`${useFavoriteAddress ? 'hidden' : ''} sm:col-span-2 sm:col-start-1`}>
                                <div>
                                    <Select
                                        name="county"
                                        placeholder='選擇城市'
                                        options={cities()}
                                        className={`${styles.input} ${hasErrorInput('ship_county')}`}
                                        onChange={handleCityChange}
                                        value={selectedCity(city)}
                                    />
                                </div>
                                <span className={`${styles.errorMsg} ${hasErrorMsg('ship_county')}`}>
                                    {errorMsg('ship_county')}
                                </span>
                            </div>

                            <div className={`${useFavoriteAddress ? 'hidden' : ''} sm:col-span-2`}>

                                <div>
                                    <Select
                                        name="district"
                                        placeholder='選擇地區'
                                        options={districts}
                                        className={`${styles.input} ${hasErrorInput('ship_district')}`}
                                        onChange={(e) => setDistrict(e.value)}
                                        value={selectedDistrict(district)}
                                    />
                                </div>
                                <span className={`${styles.errorMsg} ${hasErrorMsg('ship_district')}`}>
                                    {errorMsg('ship_district')}
                                </span>
                            </div>

                            <div className={`${useFavoriteAddress ? 'hidden' : ''} sm:col-span-4 sm:col-start-1`}>
                                <input
                                    type="text"
                                    placeholder="地址"
                                    className={`${styles.input} ${hasErrorInput('ship_address')}`}
                                    value={checkoutForm.ship_address}
                                    onChange={e => { handleFormChange('ship_address', e.target.value) }}
                                />
                                <span className={`${styles.errorMsg} ${hasErrorMsg('ship_address')}`}>
                                    {errorMsg('ship_address')}
                                </span>
                            </div>

                            <div className="sm:col-span-4 sm:col-start-1 flex items-center justify-start gap-x-4">
                                <div 
                                    className={`${useFavoriteAddress ? '' : 'hidden'} btn btn-orange`} 
                                    onClick={e => handleUseFavoriteAddressChange(false)}>
                                        其他地址
                                </div>
                                <div 
                                    className={`${useFavoriteAddress ? 'hidden' : ''}  ${(favoriteAddresses.length == 0) ? 'hidden' : ''} btn btn-blue`} 
                                    onClick={e => handleUseFavoriteAddressChange(true)}>
                                        <span className='align-middle'>常用地址</span>
                                        <ClipboardDocumentListIcon className='ml-1 inline-block h-5 w-5 align-middle' />
                                </div>
                                <div
                                    className={`${useFavoriteAddress ? 'hidden' : ''}`}>
                                        <label className='text-sm font-medium text-gray-600 align-middle'>
                                            設為常用地址
                                        </label>
                                        <input type='checkbox' 
                                            className='ml-1 w-6 h-6 align-middle' 
                                            onChange={e => handleFormChange('add_favorite', e.target.checked)}
                                            />
                                </div>
                            </div>

                            <div className="sm:col-span-1 sm:col-start-1">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    發票
                                </label>
                                <div className="mt-2">
                                    <Select
                                        className={styles.select}
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
                                        className={`${styles.input} ${hasErrorInput('ship_three_id')}`}
                                        onChange={e => handleFormChange('ship_three_id', e.target.value)}
                                    />
                                    <span className={`${styles.errorMsg} ${hasErrorMsg('ship_three_id')}`}>
                                        {errorMsg('ship_three_id')}
                                    </span>
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
                                        className={`${styles.input} ${hasErrorInput('ship_three_company')}`}
                                        onChange={e => handleFormChange('ship_three_company', e.target.value)}
                                    />
                                    <span className={`${styles.errorMsg} ${hasErrorMsg('ship_three_company')}`}>
                                        {errorMsg('ship_three_company')}
                                    </span>
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
                                        className={styles.input}
                                        value={checkoutForm.ship_memo}
                                        onChange={e => { handleFormChange('ship_memo', e.target.value) }}
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
                                        className={styles.input}
                                        onChange={e => { handleFormChange('bonus', e.target.value) }}
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

                                <div className={`flex justify-between mt-2 gap-x-3 rounded-md border-0 ring-1 ring-inset ring-gray-600 py-1.5 px-2 ${hasErrorInput('ship_pay_by')}`}>
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

                                <span className={`${styles.errorMsg} ${hasErrorMsg('ship_pay_by')}`}>
                                    {errorMsg('ship_pay_by')}
                                </span>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="mt-6 flex items-center justify-end gap-x-4">
                    <div
                        type="button"
                        className="btn btn-blue"
                        onClick={preStep}>
                        上一步
                    </div>
                    <div
                        className="btn btn-green"
                        onClick={checkout}>
                        送出訂單
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CheckoutForm;