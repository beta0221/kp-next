import MainTemplate from "components/template/MainTemplate"
import Banner from "components/Banner"
import ProductList from "components/ProductList"
import BlogSection from "components/BlogSection"
import Testimonial from "components/Testimonial"

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/landing/categories`)
  return {
      props: { 
          cats : await res.json()
      }
  }
}

export default function Home({ cats }) {

  return (
    <>
      <MainTemplate>
        <Banner />
        <ProductList cats={cats} />
        <BlogSection />
        <Testimonial />
      </MainTemplate>
    </>
  )
}
