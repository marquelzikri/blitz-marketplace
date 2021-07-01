import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import ProfileLayout from "app/components/ProfileLayout"
import getProduct from "app/products/queries/getProduct"
import deleteProduct from "app/products/mutations/deleteProduct"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

export const Product = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()
  const userOwnedStore = currentUser?.memberships?.find((membership) => membership.isDefault)
  if (!userOwnedStore) router.push(Routes.NewStorePage())
  const productId = useParam("productId", "number")
  const [deleteProductMutation] = useMutation(deleteProduct)
  const [product] = useQuery(getProduct, { id: productId })

  return (
    <>
      <Head>
        <title>Product {product.title}</title>
      </Head>

      <div>
        <h1>Product {product.title}</h1>
        <pre>{JSON.stringify(product, null, 2)}</pre>

        <Link href={Routes.EditProductPage({ productId: product.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProductMutation({ id: product.id })
              router.push(Routes.ShowMyProductsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowProductPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ShowMyProductsPage()}>
          <a>Products</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Product />
      </Suspense>
    </div>
  )
}

ShowProductPage.authenticate = true
ShowProductPage.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>

export default ShowProductPage
