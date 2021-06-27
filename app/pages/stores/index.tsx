import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrganizations from "app/organizations/queries/getOrganizations"

const ITEMS_PER_PAGE = 100

export const OrganizationsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ organizations, hasMore }] = usePaginatedQuery(getOrganizations, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {organizations.map((organization) => (
          <li key={organization.id}>
            <Link href={Routes.ShowOrganizationPage({ organizationId: organization.id })}>
              <a>{organization.name}</a>
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

const OrganizationsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Stores</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <OrganizationsList />
        </Suspense>
      </div>
    </>
  )
}

OrganizationsPage.getLayout = (page) => <Layout>{page}</Layout>

export default OrganizationsPage
