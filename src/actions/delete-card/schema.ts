import * as zod from 'zod'

export const deleteSchema = zod.object({
  id: zod.string(),

  boardId:zod.string(),
})