import { Suspense } from "react"
import { Head, Link, useQuery, useParam, BlitzPage, NotFoundError, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrganization from "app/organizations/queries/getOrganization"

export const Organization = () => {
  const router = useRouter()
  const storePermalink = useParam("store", "string")
  const [organization] = useQuery(
    getOrganization,
    { permalink: storePermalink },
    {
      onError: (error) => {
        if (error instanceof NotFoundError) router.push("/404")
      },
    }
  )

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

const ShowStorePage: BlitzPage = () => {
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

ShowStorePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowStorePage
