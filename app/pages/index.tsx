import { Suspense } from "react"
import { BlitzPage, usePaginatedQuery } from "blitz"

import Layout from "app/core/layouts/Layout"

import BrandHeader from "app/components/BrandHeader"
import HorizontalProducts from "app/components/HorizontalProducts"

import getCategories from "app/categories/queries/getCategories"

const Home: BlitzPage = () => {
  const [{ categories }] = usePaginatedQuery(getCategories, {
    orderBy: { id: "asc" },
    take: 4,
  })

  return (
    <div
      className="overflow-x-hidden"
      style={{
        fontFamily: "Roboto",
      }}
    >
      <BrandHeader />
      <Suspense fallback="Loading products...">
        {categories?.map(({ id, name }) => (
          <HorizontalProducts key={id} title={`Popular in ${name}`} category={name} />
        ))}
      </Suspense>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
