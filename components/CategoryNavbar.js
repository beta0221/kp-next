
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import SideCart from "components/SideCart";
import authHeaders from 'utilities/Request';

const navigation = {
    categories: [
        {
            id: 1,
            name: '購物趣'
        },
    ],
    pages: [
        { name: '金園廚房', href: '/' },
        { name: '訂購相關', href: '/guide' },
        { name: '聯絡我們', href: '/contactUs' },
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const CategoryNavbar = ({ loadCartItems }) => {

    const [open, setOpen] = useState(false)
    // 購物車
    const [openCart, setOpenCart] = useState(false)

    const [user, setUser] = useState(null)

    const [cats, setCats] = useState([])
    const [cartItems, setCartItems] = useState([])

    // 載入購物車
    const loadCartItemsRequest = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/kart/items`, {
            headers: authHeaders()
        })
        const _cartItems = await res.json()
        setCartItems(_cartItems)
    }

    // 登出
    const logout = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/kart/items`, {
            headers: authHeaders()
        })
        .then((res) => {
            localStorage.removeItem('token')
            window.location.href = "/"
        })
    }

    useEffect(() => {
        fetch('/api/categories')
            .then((res) => res.json())
            .then((cats) => {
                setCats(cats)
            })

        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/user`, {
            headers: authHeaders()
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.id) {
                    setUser(data)
                }
            })
    }, [])

    useEffect(() => {
        loadCartItemsRequest()
    }, [loadCartItems])

    return (
        <>
            <SideCart openCart={openCart} setOpenCart={setOpenCart} cartItems={cartItems} />
            <div className="bg-white z-30">
                {/* Mobile menu */}
                <Transition.Root show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                    <div className="flex px-4 pt-5 pb-2">
                                        <button
                                            type="button"
                                            className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                        <div className="flow-root">
                                            <a href="/" className="-m-2 block p-2 font-medium text-gray-900">
                                                首頁
                                            </a>
                                        </div>
                                    </div>


                                    {/* Links */}
                                    <Tab.Group as="div" className="mt-2">
                                        <div className="border-b border-gray-200">
                                            <Tab.List className="-mb-px flex space-x-8 px-4">
                                                {navigation.categories.map((category) => (
                                                    <Tab
                                                        key={category.name}
                                                        className={({ selected }) =>
                                                            classNames(
                                                                selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                                                                'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
                                                            )
                                                        }
                                                    >
                                                        {category.name}
                                                    </Tab>
                                                ))}
                                            </Tab.List>
                                        </div>

                                        <Tab.Panels as={Fragment}>
                                            {navigation.categories.map((category) => (
                                                <Tab.Panel key={category.name} className="space-y-10 px-4 pt-10 pb-8">
                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                                                        {cats.map((cat) => (
                                                            <div key={cat.id} className="group relative text-sm">

                                                                <div className="aspect-[7/4] overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                    <span className="absolute left-2 top-2 inset-0 z-10 text-white" aria-hidden="true" >{cat.name}</span>
                                                                    <a href={cat.menuImgUrl}>
                                                                        <img src={cat.menuImgUrl} alt={cat.name} className="w-full h-full object-cover object-center" />
                                                                    </a>
                                                                </div>

                                                            </div>
                                                        ))}
                                                    </div>

                                                </Tab.Panel>
                                            ))}
                                        </Tab.Panels>
                                    </Tab.Group>

                                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                        {navigation.pages.map((page) => (
                                            <div key={page.name} className="flow-root">
                                                <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                                    {page.name}
                                                </a>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                        <div className="flow-root">
                                            <a href="/login" className="-m-2 block p-2 font-medium text-gray-900">
                                                登入
                                            </a>
                                        </div>
                                        <div className="flow-root">
                                            <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                                註冊
                                            </a>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 py-6 px-4">
                                        <a href="#" className="-m-2 flex items-center p-2">
                                            <img
                                                src="https://tailwindui.com/img/flags/flag-canada.svg"
                                                alt=""
                                                className="block h-auto w-5 flex-shrink-0"
                                            />
                                            <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                                            <span className="sr-only">, change currency</span>
                                        </a>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <header className="relative bg-white">
                    <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                        註冊好禮：(1) 紅利 5,000 點。 (2) 商品加價購超值優惠中。
                    </p>

                    <nav aria-label="Top" className="px-4 sm:px-6 lg:px-8 z-30">
                        <div className="border-b border-gray-200">
                            <div className="flex h-16 items-center">
                                <button
                                    type="button"
                                    className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                    onClick={() => setOpen(true)}
                                >
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Logo */}
                                <div className="ml-4 flex lg:ml-0">
                                    <a href="/">
                                        <span className="sr-only">Your Company</span>
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                            alt=""
                                        />
                                    </a>
                                </div>

                                {/* Flyout menus */}
                                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                    <div className="flex h-full space-x-8">

                                        <a
                                            href="/"
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            首頁
                                        </a>

                                        {navigation.categories.map((category) => (
                                            <Popover key={category.name} className="flex">
                                                {({ open }) => (
                                                    <>
                                                        <div className="relative flex">
                                                            <Popover.Button
                                                                className={classNames(
                                                                    open
                                                                        ? 'border-indigo-600 text-indigo-600'
                                                                        : 'border-transparent text-gray-700 hover:text-gray-800',
                                                                    'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                                                )}
                                                            >
                                                                {category.name}
                                                            </Popover.Button>
                                                        </div>

                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-200"
                                                            enterFrom="opacity-0"
                                                            enterTo="opacity-100"
                                                            leave="transition ease-in duration-150"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500 z-20">
                                                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                                <div className="relative bg-white">
                                                                    <div className="mx-auto max-w-7xl px-8">

                                                                        <div className="py-8">

                                                                            <div className=" grid grid-cols-5 gap-x-4 gap-y-4">
                                                                                {cats.map((item) => (
                                                                                    <div key={item.name} className="group relative text-base sm:text-sm">
                                                                                        <div className="aspect-[7/4] overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                            <a href={`/shop/${item.slug}`}>
                                                                                                <img
                                                                                                    src={item.menuImgUrl}
                                                                                                    alt={item.name}
                                                                                                    className="h-full w-full object-cover"
                                                                                                />
                                                                                            </a>

                                                                                            <div className='absolute top-2 left-4 text-white'>
                                                                                                {item.name}
                                                                                            </div>

                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Popover.Panel>
                                                        </Transition>
                                                    </>
                                                )}
                                            </Popover>
                                        ))}

                                        {navigation.pages.map((page) => (
                                            <a
                                                key={page.name}
                                                href={page.href}
                                                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                            >
                                                {page.name}
                                            </a>
                                        ))}
                                    </div>
                                </Popover.Group>

                                <div className="ml-auto flex items-center">
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">


                                        {
                                            (user)
                                                ? (<>
                                                    <span className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                        {user.name}
                                                    </span>

                                                    <span className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                        紅利：{user.bonus}
                                                    </span>

                                                    <a href='/bills' className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                        我的訂單
                                                    </a>

                                                    <button className="text-sm font-medium text-gray-700 hover:text-gray-800"
                                                        onClick={() => logout()} >
                                                        登出
                                                    </button>
                                                </>)
                                                : (<>
                                                    <a href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                        登入
                                                    </a>
                                                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                        註冊
                                                    </a>
                                                </>)
                                        }

                                    </div>

                                    {/* <div className="hidden lg:ml-8 lg:flex">
                                        <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                                            <img
                                                src="https://tailwindui.com/img/flags/flag-canada.svg"
                                                alt=""
                                                className="block h-auto w-5 flex-shrink-0"
                                            />
                                            <span className="ml-3 block text-sm font-medium">CAD</span>
                                            <span className="sr-only">, change currency</span>
                                        </a>
                                    </div> */}

                                    {/* Search */}
                                    {/* <div className="flex lg:ml-6">
                                        <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Search</span>
                                            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                        </a>
                                    </div> */}

                                    {/* Cart */}
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <button onClick={() => setOpenCart(true)} className="group -m-2 flex items-center p-2">
                                            <ShoppingBagIcon
                                                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartItems.length}</span>
                                            <span className="sr-only">items in cart, view bag</span>
                                        </button>
                                    </div>

                                    {/* Checkout */}
                                    <div className="flex lg:ml-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer">
                                        <a href='/kart'>
                                            <span>結帳</span>
                                        </a>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </>
    );
}

export default CategoryNavbar;
