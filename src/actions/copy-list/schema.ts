import * as zod from 'zod'
export const listCopySchema = zod.object({
  id: zod.string(),
  boardId:zod.string()
})
