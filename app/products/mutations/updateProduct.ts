import getCurrentUserDefaultOrganization from "app/users/queries/getCurrentUserDefaultOrganization"
import { resolver, AuthorizationError } from "blitz"
import db from "db"

import { UpdateProduct } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateProduct),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const organization = await getCurrentUserDefaultOrganization(ctx)

    const product = await db.product.findUnique({ where: { id } })
    if (!product) throw new Error("Product not found")
    if (product.organizationId !== organization.id)
      throw new AuthorizationError("You don't own this product")

    return await db.product.update({ where: { id }, data })
  }
)
