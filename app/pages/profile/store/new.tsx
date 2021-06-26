import { useRouter, useMutation, BlitzPage, Routes } from "blitz"
import ProfileLayout from "app/components/ProfileLayout"
import createOrganization from "app/organizations/mutations/createOrganization"
import { ZodForm, FORM_ERROR } from "app/components/ZodForm"
import { CreateOrganization } from "app/organizations/validations"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const NewStorePage: BlitzPage = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()
  const [createOrganizationMutation] = useMutation(createOrganization)

  const membership = currentUser?.memberships?.find((membership) => membership.isDefault)
  if (!membership) router.push(Routes.EditStorePage())

  return (
    <div>
      <h1>Create Your Own Store</h1>

      <ZodForm
        submitText="Create Store"
        schema={CreateOrganization}
        onSubmit={async (values) => {
          try {
            await createOrganizationMutation(values)
            router.push(Routes.EditStorePage())
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

NewStorePage.authenticate = true
NewStorePage.getLayout = (page) => <ProfileLayout title={"Create New Store"}>{page}</ProfileLayout>

export default NewStorePage
