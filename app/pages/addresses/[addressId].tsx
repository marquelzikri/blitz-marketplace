import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAddress from "app/addresses/queries/getAddress"
import deleteAddress from "app/addresses/mutations/deleteAddress"

export const Address = () => {
  const router = useRouter()
  const addressId = useParam("addressId", "number")
  const [deleteAddressMutation] = useMutation(deleteAddress)
  const [address] = useQuery(getAddress, { id: addressId })

  return (
    <>
      <Head>
        <title>Address {address.id}</title>
      </Head>

      <div>
        <h1>Address {address.id}</h1>
        <pre>{JSON.stringify(address, null, 2)}</pre>

        <Link href={Routes.EditAddressPage({ addressId: address.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteAddressMutation({ id: address.id })
              router.push(Routes.AddressesPage())
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

const ShowAddressPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.AddressesPage()}>
          <a>Addresses</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Address />
      </Suspense>
    </div>
  )
}

ShowAddressPage.authenticate = true
ShowAddressPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowAddressPage
