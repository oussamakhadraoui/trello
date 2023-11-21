import { ActionState } from '@/lib/createSafeActions'
import { List } from '@prisma/client'
import * as zod from 'zod'
import { createListSchema } from './schema'

export type InputType = zod.infer<typeof createListSchema>
export type ReturnType = ActionState<InputType, List>
