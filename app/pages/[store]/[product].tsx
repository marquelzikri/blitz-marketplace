import { Suspense } from "react"
import { Head, Link, useQuery, useParam, BlitzPage, Routes, NotFoundError, useRouter } from "blitz"

import Layout from "app/core/layouts/Layout"
import getProduct from "app/products/queries/getProduct"

export const Product = ({ storePermalink }: { storePermalink: string }) => {
  const router = useRouter()
  const productPermalink = useParam("product", "string")
  const [product] = useQuery(
    getProduct,
    { permalink: productPermalink },
    {
      onError: (error) => {
        if (error instanceof NotFoundError)
          router.push(Routes.ShowStorePage({ store: storePermalink }))
      },
    }
  )

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>

      <div>
        <h1>Product {product.title}</h1>
        <pre>{JSON.stringify(product, null, 2)}</pre>
      </div>
    </>
  )
}

const ShowProductDetailPage: BlitzPage = () => {
  const storePermalink = useParam("store", "string") || ""
  return (
    <div>
      <p>
        <Link href={Routes.ShowStorePage({ store: storePermalink })}>
          <a>Products</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Product storePermalink={storePermalink} />
      </Suspense>
    </div>
  )
}

ShowProductDetailPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProductDetailPage
