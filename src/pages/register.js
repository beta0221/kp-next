import { useState } from "react";
import MainTemplate from "components/template/MainTemplate"
import guestGuard from "components/GuestGuard";
import styles from "components/cart/CheckoutForm.module.css";
import FormValidator from 'utilities/FormValidator';
import GuestGuard from "components/GuestGuard";
import AuthApi from "utilities/service/AuthApi";

function Register() {

    const inputs = [
        {
            title: '姓名',
            name: 'name',
            type: 'text'
        },
        {
            title: 'E-mail',
            name: 'email',
            type: 'email'
        },
        {
            title: '密碼',
            name: 'password',
            type: 'password'
        },
        {
            title: '確認密碼',
            name: 'password_confirmation',
            type: 'password'
        },
        {
            title: '電話',
            name: 'phone',
            type: 'text'
        },
    ]

    // 表單資料
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: ''
    })

    // 表單規則
    const validations = {
        name: [{ type: 'required' }],
        email: [{ type: 'required' }, { type: 'email' }],
        password: [{ type: 'required' }],
        password_confirmation: [{ type: 'required' }],
        phone: [{ type: 'required' }]
    }

    // 載入狀態
    const [loading, setLoading] = useState(false)
    // 完成訊息
    const [message, setMessage] = useState('')
    // 驗證錯誤資料
    const [errors, setErrors] = useState({})
    // 欄位是否錯誤
    const hasError = (name) => { return (name in errors) }
    // 欄位是否錯誤 className
    const hasErrorInput = (name) => { return (hasError(name) ? styles.errorInput : '') }
    // 提示錯誤 className
    const hasErrorMsg = (name) => { return hasError(name) ? '' : 'hidden' }
    // 提示錯誤
    const errorMsg = (name) => { return hasError(name) ? errors[name][0] : '' }

    const handleFormChange = ((key, value) => {
        let _form = Object.assign({}, form)
        _form[key] = value
        setForm(_form)
    })

    // 資料錯誤處理
    const handleValidationErrors = (errorJson) => {
        setErrors(errorJson)
    }

    const validateForm = () => {

        const validator = new FormValidator(validations)
        const validationErrors = validator.validateForm(form)

        if (Object.keys(validationErrors).length > 0) {
            handleValidationErrors(validationErrors)
            console.error(validationErrors)
            return false
        }

        handleValidationErrors({})
        return true
    }

    const submit = async () => {
        if (loading) { return }
        console.log(form)
        const isValid = validateForm()
        if (!isValid) { return }

        AuthApi.register(form)
            .then(res => {
                if (res.success) {
                    window.location.href = '/login'
                }
            })
    }
    return (
        <MainTemplate>
            <div className="container mx-auto grid grid-cols-12 p-4 md:py-12 mb-6">
                <div className="col-span-12 md:col-start-4 md:col-span-6">

                    <form action="#" method="POST">
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

                                {
                                    inputs.map((input, index) => (
                                        <div key={index}>
                                            <div>
                                                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                    {input.title}
                                                </label>
                                                <div className="mt-1 flex rounded-md shadow-sm">
                                                    <input
                                                        name={input.name}
                                                        type={input.type}
                                                        placeholder={input.title}
                                                        className={`${styles.input} ${hasErrorInput(input.name)}`}
                                                        value={form[input.name]}
                                                        onChange={e => { handleFormChange(input.name, e.target.value) }}
                                                    />
                                                </div>
                                                <span className={`${styles.errorMsg} ${hasErrorMsg(input.name)}`}>
                                                    {errorMsg(input.name)}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                }


                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <div
                                    className="btn btn-blue inline-block"
                                    onClick={submit}
                                >
                                    註冊
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MainTemplate>
    );
}

export default GuestGuard(Register);