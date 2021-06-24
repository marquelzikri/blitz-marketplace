import { getCurrentUserMemberships } from "app/users/queries/getCurrentUserDefaultOrganization"
import { resolver } from "blitz"
import db from "db"

import { CreateOrganization } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateOrganization),
  resolver.authorize(),
  async (input, ctx) => {
    const memberships = await getCurrentUserMemberships(ctx)
    if (memberships.length > 1) throw new Error("You can only create one store")

    const organization = await db.organization.findFirst({ where: { name: input.name } })
    if (organization != null) throw new Error("Store name taken")

    const newOrganization = await db.organization.create({ data: input })
    if (newOrganization == null) throw new Error("Store creation failed")

    await db.user.update({
      where: {
        id: ctx.session.userId,
      },
      data: {
        memberships: {
          create: {
            role: "OWNER",
            isDefault: true,
            organization: {
              connect: {
                id: newOrganization.id,
              },
            },
          },
        },
      },
    })

    return newOrganization
  }
)
