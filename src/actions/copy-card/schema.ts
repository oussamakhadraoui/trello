import * as zod from 'zod'
export const cardCopySchema = zod.object({
  id: zod.string(),
  boardId:zod.string()
})
