import getCurrentUser from "app/users/queries/getCurrentUser"
import { resolver } from "blitz"
import db from "db"

import { CreateAddress } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateAddress),
  resolver.authorize(),
  async (input, ctx) => {
    const user = await getCurrentUser(null, ctx)

    const address = await db.address.create({
      data: { ...input, ...{ User: { connect: { id: user.id } } } },
    })

    return address
  }
)
