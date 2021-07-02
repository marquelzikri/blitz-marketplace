import { z } from "zod"

export const UpdateUser = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
})

export const GetUser = z.object({
  id: z.number(),
})
