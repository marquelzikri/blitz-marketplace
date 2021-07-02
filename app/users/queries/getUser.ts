import { resolver, NotFoundError } from "blitz"
import db from "db"

import { GetUser } from "../validations"

export default resolver.pipe(resolver.zod(GetUser), resolver.authorize(), async ({ id }) => {
  const user = await db.user.findFirst({ where: { id } })

  if (!user) throw new NotFoundError()

  return user
})
