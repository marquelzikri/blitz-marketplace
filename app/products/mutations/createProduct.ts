import { resolver } from "blitz"
import db from "db"

import getCurrentUserDefaultOrganization from "app/users/queries/getCurrentUserDefaultOrganization"

import { CreateProduct } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateProduct),
  resolver.authorize(),
  async (input, ctx) => {
    const organization = await getCurrentUserDefaultOrganization(ctx)

    const product = await db.product.create({
      data: { ...input, organization: { connect: { id: organization.id } } },
    })

    return product
  }
)
