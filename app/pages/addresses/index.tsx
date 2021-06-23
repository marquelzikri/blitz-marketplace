import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getAddresses from "app/addresses/queries/getAddresses"

const ITEMS_PER_PAGE = 100

export const AddressesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ addresses, hasMore }] = usePaginatedQuery(getAddresses, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {addresses.map((address) => (
          <li key={address.id}>
            <Link href={Routes.ShowAddressPage({ addressId: address.id })}>
              <a>{address.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const AddressesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Addresses</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewAddressPage()}>
            <a>Create Address</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <AddressesList />
        </Suspense>
      </div>
    </>
  )
}

AddressesPage.authenticate = true
AddressesPage.getLayout = (page) => <Layout>{page}</Layout>

export default AddressesPage
