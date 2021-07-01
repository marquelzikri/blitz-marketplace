import getCurrentUserDefaultOrganization from "app/users/queries/getCurrentUserDefaultOrganization"
import { resolver, AuthorizationError } from "blitz"
import db, { Prisma, Product, Variant } from "db"

import { UpdateProduct } from "../validations"

export default resolver.pipe(
  resolver.zod(UpdateProduct),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    const organization = await getCurrentUserDefaultOrganization(ctx)
    const variantsInput = data.variants
    const { variants, ...productInput } = data

    // Check product availability & its ownership
    const product = await db.product.findUnique({ where: { id } })
    if (!product) throw new Error("Product not found")
    if (product.organizationId !== organization.id) {
      throw new AuthorizationError("You don't own this product")
    }

    let variantTransactions: Prisma.Prisma__VariantClient<Variant>[] = []
    let productTransactions: Prisma.Prisma__ProductClient<Product>[] = []
    for (const variant of variantsInput) {
      if (variant.id)
        variantTransactions.push(db.variant.update({ where: { id: variant.id }, data: variant }))
      else
        productTransactions.push(
          db.product.update({ where: { id }, data: { variants: { create: variant } } })
        )
    }

    productTransactions.push(db.product.update({ where: { id }, data: { ...productInput } }))

    const result = await db.$transaction([...variantTransactions, ...productTransactions])

    return { id, result }
  }
)
