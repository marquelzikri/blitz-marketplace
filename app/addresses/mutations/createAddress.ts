import getCurrentUser from "app/users/queries/getCurrentUser"
import { AuthenticationError, resolver } from "blitz"
import db from "db"

import { CreateAddress } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateAddress),
  resolver.authorize(),
  async (input, ctx) => {
    const user = await getCurrentUser(null, ctx)
    if (!user || user.memberships.length < 1) throw new AuthenticationError()

    const address = await db.address.create({
      data: { ...input, ...{ User: { connect: { id: user.id } } } },
    })

    return address
  }
)
