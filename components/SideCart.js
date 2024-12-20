
import { Fragment, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import NavbarContext from 'utilities/NavbarContext'
import authHeaders from 'utilities/Request'
import KartContext from 'utilities/KartContext'
import Link from 'next/link'

const myLoader = ({ src }) => {
  return src
}

export default function SideCart({openCart, setOpenCart, cartItems}) {

  const navbarContext = useContext(NavbarContext)
  const kartContext = useContext(KartContext)

  async function removeItem(productId) {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/kart/remove/${productId}`, {
      headers: authHeaders(),
      method: 'POST'
  })
    const data = await res.json()
    navbarContext.reloadCartItems()
    if (kartContext !== undefined) {
      kartContext.reloadCartItems()
    }
  }


  return (
    <Transition.Root show={openCart} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpenCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpenCart(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                        購物車
                      </Dialog.Title>
                    </div>
                    

                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className='my-2 grid grid-cols-8 gap-2'>
                              <div className='col-span-2 relative aspect-square'>
                                <Image fill={true} loader={myLoader} src={item.imgUrl} alt={item.name} />
                              </div>
                                
                              <div className='col-span-5'>{item.name}</div>
                              
                              <button type="button" onClick={() => removeItem(item.id)}
                                  className="rounded-md text-gray-800 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white" >
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>

                            </div>
                        ))}
                    </div>

                    <div className="px-4 sm:px-6">
                        <Link href='/kart' className='bg-red-500 hover:bg-red-600 text-white rounded block text-center py-4'>
                          前往結賬
                        </Link>
                    </div>


                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
