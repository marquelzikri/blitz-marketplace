import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.create({
    data: {
      email: email.toLowerCase().trim(),
      hashedPassword,
      memberships: {
        create: {
          role: "USER",
          organization: {
            connectOrCreate: {
              create: {
                name: "<Put organization name here>",
                role: "CUSTOMER",
              },
              where: {
                id: 0
              }
            },
          },
        },
      },
    },
    select: { id: true, name: true, email: true, memberships: true },
  })
  const organization = await db.organization.findUnique({
    where: {
      id: user.memberships[0]?.organizationId
    }
  })

  await ctx.session.$create({
    userId: user.id,
    roles: [user.memberships[0]!.role, organization!.role],
    orgId: user.memberships[0]!.organizationId,
  })
  return user
})
