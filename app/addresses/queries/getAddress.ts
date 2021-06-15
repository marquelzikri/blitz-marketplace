import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetAddress = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetAddress), resolver.authorize(), async ({ id }) => {
  const address = await db.address.findFirst({ where: { id } })

  if (!address) throw new NotFoundError()

  return address
})
