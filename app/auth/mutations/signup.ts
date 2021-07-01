import { resolver, SecurePassword, AuthenticationError } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  /**
   * By default, user's membership is your marketplace name.
   * After the user finished their signup process, they can
   * add a membership as an OWNER of their own store.
   */
  const storeName = process.env.STORE_NAME || "blitz-commerce"
  let organization = await db.organization.findFirst({
    where: {
      name: storeName,
    },
    select: { id: true },
  })
  if (organization == null) {
    organization = await db.organization.create({
      data: {
        name: storeName,
        permalink: storeName.toLowerCase().split(" ").join("_"),
      },
    })
  }

  const user = await db.user.create({
    data: {
      email: email.toLowerCase().trim(),
      hashedPassword,
      memberships: {
        create: {
          role: "USER",
          isDefault: false,
          organization: {
            connect: {
              id: organization.id,
            },
          },
        },
      },
    },
    select: { id: true, name: true, email: true, memberships: true },
  })
  if (!user.memberships[0]) {
    throw new AuthenticationError(
      "Application error: There's some mistakes on user creation process"
    )
  }

  const roles = user.memberships.map((membership) => membership.role)
  const orgIds = user.memberships.map((membership) => membership.organizationId)

  await ctx.session.$create({
    userId: user.id,
    roles,
    orgIds,
  })
  return user
})
