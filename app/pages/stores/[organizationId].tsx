import { Suspense } from "react"
import { Head, Link, useQuery, useParam, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrganization from "app/organizations/queries/getOrganization"

export const Organization = () => {
  const organizationId = useParam("organizationId", "number")
  const [organization] = useQuery(getOrganization, { id: organizationId })

  return (
    <>
      <Head>
        <title>{organization.name}</title>
      </Head>

      <div>
        <h1>{organization.name}</h1>
        <pre>{JSON.stringify(organization, null, 2)}</pre>
      </div>
    </>
  )
}

const ShowOrganizationPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={"/stores"}>
          <a>Stores</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Organization />
      </Suspense>
    </div>
  )
}

ShowOrganizationPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowOrganizationPage
