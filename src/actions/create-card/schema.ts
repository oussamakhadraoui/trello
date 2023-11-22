import * as zod from "zod"

export const createCardSchema = zod.object({
  title: zod
    .string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    })
    .min(3, { message: 'title must be at least 3 characters' }),
  boardId: zod.string(),
  listId:zod.string()
})