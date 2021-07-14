import { Suspense } from "react"
import { useRouter, useQuery, useMutation, BlitzPage, Routes } from "blitz"
import ProfileLayout from "app/components/ProfileLayout"
import getOrganization from "app/organizations/queries/getOrganization"
import updateOrganization from "app/organizations/mutations/updateOrganization"
import { ZodForm, FORM_ERROR } from "app/components/ZodForm"
import { UpdateOrganization } from "app/organizations/validations"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getAddresses from "app/addresses/queries/getAddresses"

export const EditOrganization = () => {
  const currentUser = useCurrentUser()
  const router = useRouter()

  const membership = currentUser?.memberships?.find((membership) => membership.isDefault)
  if (!membership) router.push(Routes.NewStorePage())

  const [organization, { setQueryData }] = useQuery(getOrganization, {
    id: membership?.organizationId,
  })

  const [addresses] = useQuery(getAddresses, {})
  const addressOptions = addresses?.addresses?.map(({ id, title }) => ({ value: id, label: title }))

  const [updateOrganizationMutation] = useMutation(updateOrganization)

  return (
    <div>
      {membership ? (
        <>
          <h1>{organization.name}</h1>

          <ZodForm
            submitText="Update Store"
            schema={UpdateOrganization}
            options={{
              id: { hidden: true },
              addressId: {
                type: "select",
                label: "Address",
                options: addressOptions,
              },
            }}
            initialValues={
              organization as Partial<{ id: number; description: string; name: string }>
            }
            onSubmit={async (values) => {
              try {
                const updated = await updateOrganizationMutation({
                  ...{ id: organization.id },
                  ...values,
                })
                await setQueryData(updated)
                router.push(Routes.EditStorePage())
              } catch (error) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </>
      ) : null}
    </div>
  )
}

const EditStorePage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditOrganization />
    </Suspense>
  )
}

EditStorePage.authenticate = true
EditStorePage.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>

export default EditStorePage
