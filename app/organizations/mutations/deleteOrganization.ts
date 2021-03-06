import getCurrentUserDefaultOrganization, {
  getCurrentUserMemberships,
} from "app/users/queries/getCurrentUserDefaultOrganization"
import { AuthorizationError, NotFoundError, resolver } from "blitz"
import db from "db"

import { DeleteOrganization } from "../validations"

export default resolver.pipe(
  resolver.zod(DeleteOrganization),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const memberships = await getCurrentUserMemberships(ctx)
    const userDefaultOrganization = await getCurrentUserDefaultOrganization(ctx)
    const organization = await db.organization.findFirst({ where: { id } })

    if (!organization) throw new NotFoundError()
    if (
      organization.id !== userDefaultOrganization.id &&
      !["OWNER", "ADMIN"].includes(memberships[0]?.role || "")
    ) {
      // if current user is not admin/superadmin & this is not user's store
      throw new AuthorizationError("This is not your store")
    }

    return await db.organization.deleteMany({ where: { id } })
  }
)
