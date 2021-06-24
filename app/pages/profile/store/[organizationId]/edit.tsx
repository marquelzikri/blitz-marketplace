import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getOrganization from "app/organizations/queries/getOrganization"
import updateOrganization from "app/organizations/mutations/updateOrganization"
import { ZodForm, FORM_ERROR } from "app/components/ZodForm"
import { UpdateOrganization } from "app/organizations/validations"

export const EditOrganization = () => {
  const router = useRouter()
  const organizationId = useParam("organizationId", "number")
  const [organization, { setQueryData }] = useQuery(getOrganization, { id: organizationId })
  const [updateOrganizationMutation] = useMutation(updateOrganization)

  return (
    <>
      <Head>
        <title>Edit Store {organization.name}</title>
      </Head>

      <div>
        <h1>Edit Store {organization.name}</h1>
        <pre>{JSON.stringify(organization)}</pre>

        <ZodForm
          submitText="Update Store"
          schema={UpdateOrganization}
          initialValues={organization as Partial<{ id: number; description: string; name: string }>}
          onSubmit={async (values) => {
            try {
              const updated = await updateOrganizationMutation({
                ...{ id: organization.id },
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowStoreDashboardPage())
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

const EditStorePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditOrganization />
      </Suspense>

      <p>
        <Link href={Routes.ShowStoreDashboardPage()}>
          <a>My store</a>
        </Link>
      </p>
    </div>
  )
}

EditStorePage.authenticate = true
EditStorePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditStorePage
