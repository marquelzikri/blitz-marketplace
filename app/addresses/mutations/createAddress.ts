import getCurrentUser from "app/users/queries/getCurrentUser"
import { AuthenticationError, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateAddress = z.object({
  title: z.string(),
  detail: z.string(),
  country: z.string(),
  City: z.string(),
  District: z.string(),
  Street: z.string(),
  postalCode: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateAddress),
  resolver.authorize(),
  async (input, ctx) => {
    const user = await getCurrentUser(null, ctx)
    if (!user || user.memberships.length < 1) throw new AuthenticationError()

    const address = await db.address.create({ data: { ...input, ...{ User: user } } })

    return address
  }
)
