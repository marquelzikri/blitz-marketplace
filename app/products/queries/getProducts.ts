import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetProductsInput
  extends Pick<Prisma.ProductFindManyArgs, "where" | "select" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  async ({ where, select, orderBy, skip = 0, take = 100 }: GetProductsInput) => {
    const {
      items: products,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.product.count({ where }),
      query: (paginateArgs) => db.product.findMany({ ...paginateArgs, where, orderBy, select }),
    })

    return {
      products,
      nextPage,
      hasMore,
      count,
    }
  }
)
