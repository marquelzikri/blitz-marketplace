import { Suspense } from "react"
import { useRouter, useQuery, useMutation, BlitzPage } from "blitz"
import ProfileLayout from "app/components/ProfileLayout"

import getUser from "app/users/queries/getUser"
import updateUser from "app/users/mutations/updateUser"
import { ZodForm, FORM_ERROR } from "app/components/ZodForm"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { UpdateUser } from "app/users/validations"

export const EditUser = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()
  if (!currentUser) router.push("/login")

  const [user, { setQueryData }] = useQuery(getUser, { id: currentUser?.id || -1 })
  const [updateUserMutation] = useMutation(updateUser)

  return (
    <div>
      <h1>Edit profile</h1>

      <ZodForm
        submitText="Update User"
        schema={UpdateUser}
        initialValues={user as Partial<{ id: number; name: string; email: string }>}
        onSubmit={async (values) => {
          try {
            const updated = await updateUserMutation(values)
            await setQueryData(updated)
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

const ProfileHome: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditUser />
    </Suspense>
  )
}

ProfileHome.authenticate = true
ProfileHome.getLayout = (page) => <ProfileLayout title="Profile">{page}</ProfileLayout>

export default ProfileHome
