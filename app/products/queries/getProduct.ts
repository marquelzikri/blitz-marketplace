import { resolver, NotFoundError } from "blitz"
import db from "db"

import { GetProduct } from "../validations"

export default resolver.pipe(resolver.zod(GetProduct), async ({ id, permalink }) => {
  const product = await db.product.findFirst({
    where: { id, permalink },
    select: {
      id: true,
      sku: true,
      title: true,
      categories: true,
      description: true,
      ratings: true,
      variants: true,
      permalink: true,
    },
  })

  if (!product) throw new NotFoundError()

  return product
})
