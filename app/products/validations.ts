import { z } from "zod"

export const CreateProduct = z.object({
  title: z.string(),
  sku: z.string(),
  description: z.string().optional(),
})

export const DeleteProduct = z.object({
  id: z.number(),
})

export const UpdateProduct = z.object({
  id: z.number(),
  title: z.string(),
  sku: z.string(),
  description: z.string(),
})

export const GetProduct = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})
