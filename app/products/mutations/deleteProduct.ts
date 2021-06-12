import getCurrentUserDefaultOrganization from "app/users/queries/getCurrentUserDefaultOrganization"
import { resolver, AuthenticationError, AuthorizationError } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteProduct = z.object({
  id: z.number(),
  organization: z.object({
    id: z.number().int(),
  }),
})

export default resolver.pipe(
  resolver.zod(DeleteProduct),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const organization = await getCurrentUserDefaultOrganization(ctx)
    if (!organization) throw new AuthenticationError()

    const product = await db.product.findUnique({ where: { id } })
    if (!product) throw new Error("Product not found")
    if (product.organizationId !== organization.id)
      throw new AuthorizationError("You don't own this product")

    return await db.product.deleteMany({ where: { id } })
  }
)
