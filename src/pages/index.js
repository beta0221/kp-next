import MainTemplate from "components/template/MainTemplate"
import Banner from "components/Banner"
import ProductList from "components/ProductList"
import BlogSection from "components/BlogSection"
import Testimonial from "components/Testimonial"

// export async function getStaticProps(context) {
export async function getServerSideProps(context) {
  const [bannersRes, catsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/landing/banners`),
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/landing/categories`)
  ])

  const [banners, cats] = await Promise.all([
    bannersRes.json(), 
    catsRes.json()
  ]);

  return {
    props: { 
      banners: banners,
      cats : cats
    }
  }
}

export default function Home({ banners, cats }) {

  return (
      <MainTemplate>
        <Banner banners={banners}/>
        <ProductList cats={cats} />
        <BlogSection />
        <Testimonial />
      </MainTemplate>
  )
}
