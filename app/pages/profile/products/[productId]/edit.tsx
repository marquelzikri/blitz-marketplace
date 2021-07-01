import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import ProfileLayout from "app/components/ProfileLayout"
import getProduct from "app/products/queries/getProduct"
import updateProduct from "app/products/mutations/updateProduct"
import { ZodForm, FORM_ERROR } from "app/components/ZodForm"
import { UpdateProduct } from "app/products/validations"

export const EditProduct = () => {
  const router = useRouter()
  const productId = useParam("productId", "number")
  const [product] = useQuery(getProduct, { id: productId })
  const [updateProductMutation] = useMutation(updateProduct)

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>

      <div>
        <h1>{product.title}</h1>

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
        <Link href={Routes.ShowMyProductsPage()}>
          <a>Products</a>
        </Link>
      </p>
    </div>
  )
}

EditProductPage.authenticate = true
EditProductPage.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>

export default EditProductPage
