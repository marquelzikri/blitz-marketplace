import { z } from "zod"

export const CreateAddress = z.object({
  title: z.string(),
  detail: z.string(),
  country: z.string(),
  city: z.string(),
  district: z.string(),
  street: z.string(),
  postalCode: z.string(),
})

export const UpdateAddress = z.object({
  id: z.number(),
  title: z.string(),
  detail: z.string(),
  country: z.string(),
  city: z.string(),
  district: z.string(),
  street: z.string(),
  postalCode: z.string(),
})

export const DeleteAddress = z.object({
  id: z.number(),
})

export const GetAddress = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})
