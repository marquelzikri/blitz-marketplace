import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import ProfileLayout from "app/components/ProfileLayout"
import createProduct from "app/products/mutations/createProduct"
import { ZodForm, FORM_ERROR } from "app/components/ZodForm"
import { CreateProduct } from "app/products/validations"

const NewProductPage: BlitzPage = () => {
  const router = useRouter()
  const [createProductMutation] = useMutation(createProduct)

  return (
    <div>
      <h1>Create New Product</h1>

      <ZodForm
        submitText="Create Product"
        schema={CreateProduct}
        onSubmit={async (values) => {
          try {
            const product = await createProductMutation(values)
            router.push(Routes.ShowProductPage({ productId: product.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ShowMyProductsPage()}>
          <a>Products</a>
        </Link>
      </p>
    </div>
  )
}

NewProductPage.authenticate = true
NewProductPage.getLayout = (page) => (
  <ProfileLayout title={"Create New Product"}>{page}</ProfileLayout>
)

export default NewProductPage
