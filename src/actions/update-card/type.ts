import * as zod from 'zod'
import { updateCardSchema } from './schema'
import { ActionState } from '@/lib/createSafeActions'
import { Board, Card } from '@prisma/client'
export type InputType = zod.infer<typeof updateCardSchema> 

export type ReturnType = ActionState<InputType, Card>