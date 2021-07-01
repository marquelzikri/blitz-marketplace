import { z } from "zod"

export const CreateProduct = z.object({
  title: z.string(),
  sku: z.string(),
  description: z.string().optional(),
  permalink: z.string(),
  variants: z
    .array(
      z.object({
        sku: z.string(),
        stock: z.number(),
        color: z.string(),
        length: z.number(),
        width: z.number(),
        height: z.number(),
        weight: z.number(),
      })
    )
    .nonempty(),
})

export const DeleteProduct = z.object({
  id: z.number(),
})

export const UpdateProduct = z.object({
  id: z.number(),
  title: z.string(),
  sku: z.string(),
  description: z.string(),
  permalink: z.string(),
  variants: z
    .array(
      z.object({
        id: z.number().optional(),
        sku: z.string(),
        stock: z.number(),
        color: z.string(),
        length: z.number(),
        width: z.number(),
        height: z.number(),
        weight: z.number(),
      })
    )
    .nonempty(),
})

export const GetProduct = z.object({
  id: z.number().optional(),
  permalink: z.string().optional(),
})
