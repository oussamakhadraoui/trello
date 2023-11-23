import { ActionState } from '@/lib/createSafeActions'
import { Card, List } from '@prisma/client'
import * as zod from 'zod'
import { updateCardOrderSchema } from './schema'

export type InputType = zod.infer<typeof updateCardOrderSchema>
export type ReturnType = ActionState<InputType, Card[]>
