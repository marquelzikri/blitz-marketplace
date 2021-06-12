import { AuthenticationError } from "blitz"
import getCurrentUser from "./getCurrentUser"

export default async function getCurrentUserDefaultOrganization(ctx) {
  const user = await getCurrentUser(null, ctx)
  if (!user || user.memberships.length < 1) throw new AuthenticationError()
  const organization = user.memberships.find((membership) => membership.isDefault)
  if (!organization) throw new AuthenticationError()

  return organization
}
