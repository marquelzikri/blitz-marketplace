import { SecurePassword } from "blitz"
import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  // Delete all existing data
  await db.category.deleteMany()
  await db.variant.deleteMany()
  await db.rating.deleteMany()
  await db.product.deleteMany()
  await db.membership.deleteMany()
  await db.organization.deleteMany()
  await db.address.deleteMany()
  await db.token.deleteMany()
  await db.session.deleteMany()
  await db.user.deleteMany()

  // Create default store/shop
  const storeName = process.env.STORE_NAME || "blitz_commerce"
  const defaultStore = await db.organization.create({
    data: {
      name: storeName,
      permalink: storeName.toLowerCase().split(" ").join("_"),
    },
  })

  // Create user
  const hashedPassword = await SecurePassword.hash("123456789ab".trim())
  const user = await db.user.create({
    data: {
      email: "user1@mail.com",
      hashedPassword,
      memberships: {
        create: {
          role: "USER",
          isDefault: false,
          organization: {
            connect: {
              id: defaultStore.id,
            },
          },
        },
      },
    },
    select: { id: true, name: true, email: true, memberships: true },
  })

  // Create user's store/shop
  const userStore = await db.organization.create({
    data: {
      name: "Store 1",
      permalink: "store_1",
    },
  })
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      memberships: {
        create: {
          role: "OWNER",
          isDefault: true,
          organization: {
            connect: {
              id: userStore.id,
            },
          },
        },
      },
    },
  })

  // Create user's first product
  await db.product.create({
    data: {
      sku: "123",
      title: "T-shirt",
      permalink: "t-shirt",
      organization: { connect: { id: userStore.id } },
      variants: {
        create: {
          sku: "1231",
          price: 10,
          color: "white",
          // dimensions in cm
          height: 74.5,
          width: 55.9,
          length: 1,
          weight: 0.5, // kg
          stock: 10,
        },
      },
      categories: {
        create: {
          name: "t-shirt",
        },
      },
    },
  })
}

export default seed
