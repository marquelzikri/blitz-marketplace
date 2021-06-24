import { Membership } from "@prisma/client"
import { AuthenticationError, Ctx } from "blitz"
import getCurrentUser from "./getCurrentUser"

export async function getCurrentUserMemberships(ctx: Ctx): Promise<Membership[]> {
  const user = await getCurrentUser(null, ctx)
  if (!user?.memberships || user?.memberships?.length < 1) {
    throw new AuthenticationError()
  }

  return user.memberships
}

export default async function getCurrentUserDefaultOrganization(ctx) {
  const user = await getCurrentUser(null, ctx)
  if (!user?.memberships || user?.memberships?.length < 1) throw new AuthenticationError()

  const organization = user.memberships.find((membership) => membership.isDefault)
  if (!organization) throw new Error("You are not a seller")

  return organization
}
