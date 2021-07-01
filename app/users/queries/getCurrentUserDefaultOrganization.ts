import { Membership } from "@prisma/client"
import { AuthenticationError, Ctx } from "blitz"
import db from "db"

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

  const defaultMembership = user.memberships.find((membership) => membership.isDefault)
  const organization = await db.organization.findUnique({
    where: { id: defaultMembership?.organizationId },
  })
  if (!defaultMembership || !organization) throw new Error("You are not a seller")

  return organization
}
