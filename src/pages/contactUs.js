import styles from "components/cart/CheckoutForm.module.css";
import MainTemplate from "components/template/MainTemplate";
import { useState, useEffect, useContext } from 'react'
import FormValidator from 'utilities/FormValidator';
import ContactApi from "utilities/service/ContactApi";

const ContactUs = () => {

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
            title: '主旨',
            name: 'title',
            type: 'text'
        },
    ]

    // 表單資料
    const [form, setForm] = useState({
        name: '',
        email: '',
        title: '',
        text: ''
    })

    // 表單規則
    const validations = {
        name: [{ type: 'required' }],
        email: [{ type: 'required' }, { type: 'email' }],
        title: [{ type: 'required' }],
        text: [{ type: 'required' }]
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

        setLoading(true)
        setMessage('')
        ContactApi.contact(form)
            .then(res => {
                console.log(res)
                setLoading(false)
                setForm({
                    name: '',
                    email: '',
                    title: '',
                    text: ''
                })
                if(res.message) {
                    setMessage(res.message)
                }
            })
            .catch(error => {
                setLoading(false)
                try {
                    const errorJson = JSON.parse(error.message); // 試圖將錯誤訊息解析為 JSON
                    handleValidationErrors(errorJson)
                } catch (parsingError) {
                    console.error('發生錯誤:', error.message); // 如果無法解析為 JSON，則顯示普通錯誤訊息
                }
            })
    }

    return (
        <>
            <MainTemplate>
                <div className="bg-slate-300 h-96"></div>


                <div className="container mx-auto grid grid-cols-12 p-4 md:py-12 mb-6">

                    <div className="col-span-12 md:col-start-4 md:col-span-6 mb-2 text-center">
                        
                        <div className={`${(loading) ? 'inline-block' : 'hidden'}`}>
                            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                        </div>

                        <div className={`${(message) ? 'block' : 'hidden'} mb-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded`}>
                            <span>{message}</span>
                        </div>

                    </div>

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


                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                            訊息
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                name="text"
                                                rows={6}
                                                className={`${styles.input} ${hasErrorInput('text')}`}
                                                placeholder="訊息..."
                                                value={form.text}
                                                onChange={e => { handleFormChange('text', e.target.value) }}
                                            />
                                            <span className={`${styles.errorMsg} ${hasErrorMsg('text')}`}>
                                                {errorMsg('text')}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            收到您的訊息後，我們將會儘速回覆，請留意信箱
                                        </p>
                                    </div>


                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <div
                                        className="btn btn-blue inline-block"
                                        onClick={submit}
                                    >
                                        送出
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>


                </div>


            </MainTemplate>
        </>
    );
}

export default ContactUs;
