import getCurrentUser from "app/users/queries/getCurrentUser"
import { resolver } from "blitz"
import db from "db"

import { DeleteAddress } from "../validations"

export default resolver.pipe(
  resolver.zod(DeleteAddress),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const user = await getCurrentUser(null, ctx)

    const address = await db.address.deleteMany({ where: { id, userId: user.id } })

    return address
  }
)
