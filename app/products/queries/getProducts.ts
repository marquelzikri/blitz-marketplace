import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetProductsInput
  extends Pick<Prisma.ProductFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetProductsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: products,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.product.count({ where }),
      query: (paginateArgs) => db.product.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      products,
      nextPage,
      hasMore,
      count,
    }
  }
)
