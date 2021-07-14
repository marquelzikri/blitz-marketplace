import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import ProfileLayout from "app/components/ProfileLayout"
import getAddress from "app/addresses/queries/getAddress"
import deleteAddress from "app/addresses/mutations/deleteAddress"
import updateAddress from "app/addresses/mutations/updateAddress"
import { ZodForm, FORM_ERROR } from "app/components/ZodForm"
import { UpdateAddress } from "app/addresses/validations"

export const EditAddress = () => {
  const router = useRouter()
  const addressId = useParam("addressId", "number")
  const [address, { setQueryData }] = useQuery(getAddress, { id: addressId })
  const [updateAddressMutation] = useMutation(updateAddress)
  const [deleteAddressMutation] = useMutation(deleteAddress)

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
          options={{
            id: { hidden: true },
          }}
          initialValues={address}
          onSubmit={async (values) => {
            try {
              const updated = await updateAddressMutation({
                ...{ id: address.id },
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.AddressesPage())
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteAddressMutation({ id: address.id })
              router.push(Routes.AddressesPage())
            }
          }}
        >
          Delete
        </button>
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
EditAddressPage.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>

export default EditAddressPage
