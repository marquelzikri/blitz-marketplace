import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetCategory = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetCategory), async ({ id }) => {
  const category = await db.category.findFirst({ where: { id } })

  if (!category) throw new NotFoundError()

  return category
})
