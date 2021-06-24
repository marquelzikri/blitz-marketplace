import getCurrentUser from "app/users/queries/getCurrentUser"
import { AuthorizationError, resolver } from "blitz"
import db from "db"

import { UpdateAddress } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateAddress),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const user = await getCurrentUser(null, ctx)

    const address = await db.address.findUnique({ where: { id } })
    if (!address) throw new Error("Address not found")
    if (address?.userId !== user.id) throw new AuthorizationError("You don't own this product")

    return await db.address.update({ where: { id: address.id }, data })
  }
)
