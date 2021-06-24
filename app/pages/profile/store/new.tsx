import { useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createOrganization from "app/organizations/mutations/createOrganization"
import { ZodForm, FORM_ERROR } from "app/components/ZodForm"
import { CreateOrganization } from "app/organizations/validations"

const NewOrganizationPage: BlitzPage = () => {
  const router = useRouter()
  const [createOrganizationMutation] = useMutation(createOrganization)

  return (
    <div>
      <h1>Create New Store</h1>

      <ZodForm
        submitText="Create Store"
        schema={CreateOrganization}
        onSubmit={async (values) => {
          try {
            const organization = await createOrganizationMutation(values)
            router.push(`/organizations/${organization.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </div>
  )
}

NewOrganizationPage.authenticate = true
NewOrganizationPage.getLayout = (page) => <Layout title={"Create New Store"}>{page}</Layout>

export default NewOrganizationPage
