import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  let roles
  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, memberships: true },
  })

  if (user) {
    roles = user.memberships.map(membership => membership.role)
  }

  return { ...user, ...{ roles } }
}
