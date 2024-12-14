import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import ProductSelector from 'components/ProductSelector';
import MainTemplate from "components/template/MainTemplate"

// export async function getStaticProps(context) {
//     const slug = context.params.slug
//     const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/shop/${slug}`)
//     const data = await res.json()
//     return {
//         props: {
//             cat: data.cat,
//             products: data.products
//         }
//     }
// }

// export async function getStaticPaths() {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/shop/paths`)
//     const paths = await res.json()
//     return {
//         paths: paths,
//         fallback: false
//     }
// }

export async function getServerSideProps(context) {

    const slug = context.query.slug
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/shop/${slug}`)
    if (!res.ok) {
        return {
            notFound: true,
        }
    }

    const data = await res.json()
    return {
        props: {
            cat: data.cat,
            products: data.products
        }
    }
}

export default function Shop({ cat, products }) {
    return (
        <MainTemplate>


            <div className='container mx-auto max-w-3xl py-4 px-4 sm:py-16 sm:px-8'>

                <ProductSelector cat={cat} products={products} />

                <div className='h-8' />

                {/* 加購商品 */}
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">加價購</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Margot Foster</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Application for</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">Backend Developer</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className='h-8' />

                
                {/* 商品說明 */}
                <div dangerouslySetInnerHTML={{ __html: cat.content }}></div>

            </div>


        </MainTemplate>
    )
}