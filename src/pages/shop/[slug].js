import { useRouter } from 'next/router'
import { useEffect ,useState } from "react";
import MainTemplate from "components/template/MainTemplate"

export async function getStaticProps(context) {
    return {
        props: {
            cat: context.params.slug
        }
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/shop/paths`)
    const paths = await res.json()
    return {
        paths: paths,
        fallback: false
    }
}

export default function Shop({cat}) {
    return (
        <MainTemplate>
            <h1>Hello</h1>
            <h2>{cat}</h2>
        </MainTemplate>
    )
}