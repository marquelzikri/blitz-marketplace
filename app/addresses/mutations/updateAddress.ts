import getCurrentUser from "app/users/queries/getCurrentUser"
import { AuthenticationError, resolver } from "blitz"
import db from "db"

import { UpdateAddress } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateAddress),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const user = await getCurrentUser(null, ctx)
    if (!user || user.memberships.length < 1) throw new AuthenticationError()

    const address = await db.address.updateMany({ where: { id, userId: user.id }, data })

    return address
  }
)
