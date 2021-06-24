import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProduct from "app/products/queries/getProduct"
import updateProduct from "app/products/mutations/updateProduct"
import { ZodForm, FORM_ERROR } from "app/components/ZodForm"
import { UpdateProduct } from "app/products/validations"

export const EditProduct = () => {
  const router = useRouter()
  const productId = useParam("productId", "number")
  const [product, { setQueryData }] = useQuery(getProduct, { id: productId })
  const [updateProductMutation] = useMutation(updateProduct)

  return (
    <>
      <Head>
        <title>Edit Product {product.id}</title>
      </Head>

      <div>
        <h1>Edit Product {product.id}</h1>
        <pre>{JSON.stringify(product)}</pre>

        <ZodForm
          submitText="Update Product"
          schema={UpdateProduct}
          initialValues={
            product as Partial<{ id: number; title: string; sku: string; description: string }>
          }
          onSubmit={async (values) => {
            try {
              const updated = await updateProductMutation({
                ...{ id: product.id },
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowProductPage({ productId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditProductPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProduct />
      </Suspense>

      <p>
        <Link href={Routes.ProductsPage()}>
          <a>Products</a>
        </Link>
      </p>
    </div>
  )
}

EditProductPage.authenticate = true
EditProductPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditProductPage
