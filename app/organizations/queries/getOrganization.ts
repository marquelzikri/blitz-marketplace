import { resolver, NotFoundError } from "blitz"
import db from "db"

import { GetOrganization } from "../validations"

export default resolver.pipe(resolver.zod(GetOrganization), async ({ id }) => {
  const organization = await db.organization.findFirst({ where: { id } })

  if (!organization) throw new NotFoundError()

  return organization
})
