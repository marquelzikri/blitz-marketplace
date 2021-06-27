import { BlitzPage } from "blitz"
import ProfileLayout from "app/components/ProfileLayout"

const ProfileHome: BlitzPage = () => {
  return <></>
}

ProfileHome.authenticate = true
ProfileHome.getLayout = (page) => <ProfileLayout title="Profile">{page}</ProfileLayout>

export default ProfileHome
