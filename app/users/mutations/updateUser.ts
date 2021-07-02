import { AuthenticationError, resolver } from "blitz"
import db from "db"

import getCurrentUser from "../queries/getCurrentUser"
import { UpdateUser } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateUser),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const user = await getCurrentUser(null, ctx)
    if (!user) throw new AuthenticationError()
    if (user.id !== id) throw new Error("This is not your data")

    const updatedUser = await db.user.update({ where: { id }, data })

    return updatedUser
  }
)
