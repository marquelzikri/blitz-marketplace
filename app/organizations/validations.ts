import { z } from "zod"

export const CreateOrganization = z.object({
  name: z.string(),
  description: z.string(),
  permalink: z.string(),
})

export const DeleteOrganization = z.object({
  id: z.number(),
})

export const UpdateOrganization = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
})

export const GetOrganization = z.object({
  id: z.number().optional(),
  permalink: z.string().optional(),
})
