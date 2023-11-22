import { ActionState } from '@/lib/createSafeActions'
import { Card, List } from '@prisma/client'
import * as zod from 'zod'
import { createCardSchema } from './schema'

export type InputType = zod.infer<typeof createCardSchema>
export type ReturnType = ActionState<InputType, Card>
