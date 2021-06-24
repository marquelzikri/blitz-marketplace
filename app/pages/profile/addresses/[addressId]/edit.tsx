import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAddress from "app/addresses/queries/getAddress"
import updateAddress from "app/addresses/mutations/updateAddress"
import { ZodForm, FORM_ERROR } from "app/components/ZodForm"
import { UpdateAddress } from "app/addresses/validations"

export const EditAddress = () => {
  const router = useRouter()
  const addressId = useParam("addressId", "number")
  const [address, { setQueryData }] = useQuery(getAddress, { id: addressId })
  const [updateAddressMutation] = useMutation(updateAddress)

  return (
    <>
      <Head>
        <title>Edit Address {address.id}</title>
      </Head>

      <div>
        <h1>Edit Address: {address.title}</h1>

        <ZodForm
          submitText="Update Address"
          schema={UpdateAddress}
          initialValues={address}
          onSubmit={async (values) => {
            try {
              const updated = await updateAddressMutation({
                ...{ id: address.id },
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowAddressPage({ addressId: updated.id }))
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

const EditAddressPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditAddress />
      </Suspense>

      <p>
        <Link href={Routes.AddressesPage()}>
          <a>Addresses</a>
        </Link>
      </p>
    </div>
  )
}

EditAddressPage.authenticate = true
EditAddressPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditAddressPage
