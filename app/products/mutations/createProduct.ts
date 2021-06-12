import { resolver, AuthenticationError } from "blitz"
import db from "db"
import { z } from "zod"

import getCurrentUserDefaultOrganization from "app/users/queries/getCurrentUserDefaultOrganization"

const CreateProduct = z.object({
  title: z.string(),
  sku: z.string(),
  description: z.string().optional(),
})

export default resolver.pipe(
  resolver.zod(CreateProduct),
  resolver.authorize(),
  async (input, ctx) => {
    const organization = await getCurrentUserDefaultOrganization(ctx)
    if (!organization) throw new AuthenticationError()

    const product = await db.product.create({
      data: { ...input, organization: { connect: { id: organization.id } } },
    })

    return product
  }
)
