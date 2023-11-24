import * as zod from 'zod'
import { cardCopySchema } from './schema'
import { ActionState } from '@/lib/createSafeActions'
import {  Card } from '@prisma/client'
export type InputType = zod.infer<typeof cardCopySchema> 

export type ReturnType = ActionState<InputType, Card>