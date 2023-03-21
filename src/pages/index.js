import MainTemplate from "components/template/MainTemplate"
import Banner from "components/Banner"
import ProductList from "components/ProductList"
import BlogSection from "components/BlogSection"
import Testimonial from "components/Testimonial"
import CategoryContext from "utilities/CategoryContext"

export async function getStaticProps(context) {

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
    <CategoryContext.Provider value={cats}>
      <MainTemplate>
        <Banner banners={banners}/>
        <ProductList />
        <BlogSection />
        <Testimonial />
      </MainTemplate>
    </CategoryContext.Provider>
  )
}
