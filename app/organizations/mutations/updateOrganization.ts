import getCurrentUser from "app/users/queries/getCurrentUser"
import getCurrentUserDefaultOrganization, {
  getCurrentUserMemberships,
} from "app/users/queries/getCurrentUserDefaultOrganization"
import { AuthenticationError, AuthorizationError, NotFoundError, resolver } from "blitz"
import db from "db"

import { UpdateOrganization } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateOrganization),
  resolver.authorize(),
  async (input, ctx) => {
    const user = await getCurrentUser(null, ctx)
    if (!user) throw new AuthenticationError()

    const address = await db.address.findFirst({ where: { id: input.addressId, userId: user.id } })
    if (!address) throw new Error("This address is not belongs to you")

    const memberships = await getCurrentUserMemberships(ctx)
    const userDefaultOrganization = await getCurrentUserDefaultOrganization(ctx)
    const organization = await db.organization.findFirst({ where: { id: input.id } })
    if (!organization) throw new NotFoundError()
    if (
      organization.id !== userDefaultOrganization.id &&
      !["OWNER", "ADMIN"].includes(memberships[0]?.role || "")
    ) {
      // if current user is not admin/superadmin & this is not user's store
      throw new AuthorizationError("This is not your store")
    }

    return await db.organization.update({ where: { id: input.id }, data: input })
  }
)
