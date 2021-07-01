import { resolver, NotFoundError } from "blitz"
import db from "db"

import { GetOrganization } from "../validations"

export default resolver.pipe(resolver.zod(GetOrganization), async ({ id, permalink }) => {
  const organization = await db.organization.findFirst({ where: { id, permalink } })

  if (!organization) throw new NotFoundError()

  return organization
})
