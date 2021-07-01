import { resolver, NotFoundError } from "blitz"
import db from "db"

import { GetProduct } from "../validations"

export default resolver.pipe(resolver.zod(GetProduct), resolver.authorize(), async ({ id }) => {
  const product = await db.product.findFirst({
    where: { id },
    select: {
      id: true,
      sku: true,
      title: true,
      categories: true,
      price: true,
      description: true,
      ratings: true,
      variants: true,
    },
  })

  if (!product) throw new NotFoundError()

  return product
})
