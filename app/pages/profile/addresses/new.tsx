import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"

import Layout from "app/core/layouts/Layout"
import createAddress from "app/addresses/mutations/createAddress"
import { ZodForm, FORM_ERROR } from "app/components/ZodForm"
import { CreateAddress } from "app/addresses/validations"

const NewAddressPage: BlitzPage = () => {
  const router = useRouter()
  const [createAddressMutation] = useMutation(createAddress)

  return (
    <div>
      <h1>Create New Address</h1>

      <ZodForm
        submitText="Create Address"
        schema={CreateAddress}
        onSubmit={async (values) => {
          try {
            const address = await createAddressMutation(values)
            router.push(Routes.ShowAddressPage({ addressId: address.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.AddressesPage()}>
          <a>Addresses</a>
        </Link>
      </p>
    </div>
  )
}

NewAddressPage.authenticate = true
NewAddressPage.getLayout = (page) => <Layout title={"Create New Address"}>{page}</Layout>

export default NewAddressPage
