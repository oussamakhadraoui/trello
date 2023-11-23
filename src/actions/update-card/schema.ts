import * as zod from 'zod'
export const updateCardSchema = zod.object({
  boardId:zod.string(),
  description:zod.optional(zod.string({required_error:'description required',invalid_type_error:"description is required"}).min(3,{message:"description is too short"})),
  title: zod
    .string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    })
    .min(3, { message: 'title must be at least 3 characters' }),
  id: zod.string(),
})
