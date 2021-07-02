import getCurrentUser from "app/users/queries/getCurrentUser"
import { getCurrentUserMemberships } from "app/users/queries/getCurrentUserDefaultOrganization"
import { AuthenticationError, resolver } from "blitz"
import db from "db"

import { CreateOrganization } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateOrganization),
  resolver.authorize(),
  async (input, ctx) => {
    const user = await getCurrentUser(null, ctx)
    if (!user) throw new AuthenticationError()

    const { addressId, ...organizationInput } = input
    const address = await db.address.findFirst({ where: { id: addressId, userId: user.id } })
    if (!address) throw new Error("This address is not belongs to you")

    const memberships = await getCurrentUserMemberships(ctx)
    if (memberships.length > 1) throw new Error("You can only create one store")

    const organization = await db.organization.findFirst({
      where: { name: organizationInput.name },
    })
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
