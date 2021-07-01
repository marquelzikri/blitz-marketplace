import { resolver } from "blitz"
import db, { Prisma } from "db"

import getCurrentUserDefaultOrganization from "app/users/queries/getCurrentUserDefaultOrganization"

import { CreateProduct } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateProduct),
  resolver.authorize(),
  async (input, ctx) => {
    const organization = await getCurrentUserDefaultOrganization(ctx)
    const { categories, variants, ...productInput } = input

    let categoriesInput: Prisma.Enumerable<Prisma.CategoryCreateOrConnectWithoutProductsInput> = []
    for (const category of categories) {
      const name = category.name.toLowerCase()
      categoriesInput.push({ where: { name }, create: { name } })
    }

    const product = await db.product.create({
      data: {
        ...productInput,
        organization: { connect: { id: organization.id } },
        variants: { create: variants },
        categories: { connectOrCreate: categoriesInput },
      },
    })

    return product
  }
)
