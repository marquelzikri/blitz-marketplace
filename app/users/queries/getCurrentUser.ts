import { AuthenticationError, Ctx } from "blitz"
import db, { Membership, MembershipRole, User } from "db"

type CurrentUser = Partial<User & { roles: MembershipRole[] } & { memberships: Membership[] }>

export default async function getCurrentUser(_ = null, { session }: Ctx): Promise<CurrentUser> {
  if (!session.userId) throw new AuthenticationError()

  const user: CurrentUser | null = await db.user.findFirst({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, memberships: true },
  })
  if (!user) throw new AuthenticationError()
  if (!user?.memberships) throw new AuthenticationError()

  const roles: MembershipRole[] = user.memberships.map((membership) => membership.role)

  return { ...user, ...{ roles } }
}
