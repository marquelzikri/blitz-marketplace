import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

import BrandHeader from "../components/BrandHeader"
import Banner from "../components/Banner"
import HorizontalProducts from "../components/HorizontalProducts"

const Home: BlitzPage = () => {
  return (
    <div
      className="overflow-x-hidden"
      style={{
        fontFamily: "Roboto",
      }}
    >
      <BrandHeader />
      <Banner />

      <HorizontalProducts
        title="Popular in Women"
        url="https://files.sirclocdn.xyz/frontend-test-37/men-products.json"
      />
      <HorizontalProducts
        title="Popular in Men"
        url="https://files.sirclocdn.xyz/frontend-test-37/women-products.json"
      />
      <HorizontalProducts
        title="Popular in Accessories"
        url="https://files.sirclocdn.xyz/frontend-test-37/accessories-products.json"
      />
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
