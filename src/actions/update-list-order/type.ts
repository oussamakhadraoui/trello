import { ActionState } from '@/lib/createSafeActions'
import { List } from '@prisma/client'
import * as zod from 'zod'
import { updateListOrderSchema } from './schema'

export type InputType = zod.infer<typeof updateListOrderSchema>
export type ReturnType = ActionState<InputType, List[]>
