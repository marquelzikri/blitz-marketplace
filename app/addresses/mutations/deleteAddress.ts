import getCurrentUser from "app/users/queries/getCurrentUser"
import { AuthenticationError, resolver } from "blitz"
import db from "db"

import { DeleteAddress } from "../validations"

export default resolver.pipe(
  resolver.zod(DeleteAddress),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const user = await getCurrentUser(null, ctx)
    if (!user || user.memberships.length < 1) throw new AuthenticationError()

    const address = await db.address.deleteMany({ where: { id, userId: user.id } })

    return address
  }
)
