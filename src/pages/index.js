import Navbar from "components/Navbar"
import Banner from "components/Banner"
import ProductList from "components/ProductList"
import BlogSection from "components/BlogSection"
import Testimonial from "components/Testimonial"
import Footer from "components/Footer"

export default function Home() {

  return (
    <>
      <Navbar />
      <Banner />
      <ProductList />
      <BlogSection />
      <Testimonial />
      <Footer />
    </>
  )
}
