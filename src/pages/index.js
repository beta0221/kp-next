import MainTemplate from "components/template/MainTemplate"
import Banner from "components/Banner"
import ProductList from "components/ProductList"
import BlogSection from "components/BlogSection"
import Testimonial from "components/Testimonial"

export default function Home() {

  return (
    <>
      <MainTemplate>
        <Banner />
        <ProductList />
        <BlogSection />
        <Testimonial />
      </MainTemplate>
    </>
  )
}
