import getCurrentUser from "app/users/queries/getCurrentUser"
import { AuthenticationError, paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetAddressesInput
  extends Pick<Prisma.AddressFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetAddressesInput, ctx) => {
    const user = await getCurrentUser(null, ctx)
    if (!user || user.memberships.length < 1) throw new AuthenticationError()

    const {
      items: addresses,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.address.count({ where }),
      query: (paginateArgs) =>
        db.address.findMany({
          ...paginateArgs,
          where: { ...where, ...{ userId: user.id } },
          orderBy,
        }),
    })

    return {
      addresses,
      nextPage,
      hasMore,
      count,
    }
  }
)
