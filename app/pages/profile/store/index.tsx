import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrganization from "app/organizations/queries/getOrganization"
import deleteOrganization from "app/organizations/mutations/deleteOrganization"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

export const Organization = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  const membership = currentUser.memberships?.find((membership) => membership.isDefault)
  if (!membership) router.push("/store/new")

  const [deleteOrganizationMutation] = useMutation(deleteOrganization)
  const [organization] = useQuery(getOrganization, { id: membership?.organizationId })

  return (
    <>
      <Head>
        <title>{organization.name}</title>
      </Head>

      <div>
        <h1>{organization.name}</h1>
        <pre>{JSON.stringify(organization, null, 2)}</pre>

        <Link href={Routes.EditStorePage({ organizationId: organization.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteOrganizationMutation({ id: organization.id })
              router.push(Routes.OrganizationsPage())
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

const ShowStoreDashboardPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Organization />
    </Suspense>
  )
}

ShowStoreDashboardPage.authenticate = true
ShowStoreDashboardPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowStoreDashboardPage
