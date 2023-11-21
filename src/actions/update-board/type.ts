import * as zod from 'zod'
import { titleSchema } from './schema'
import { ActionState } from '@/lib/createSafeActions'
import { Board } from '@prisma/client'
export type InputType=zod.infer<typeof titleSchema> 

export type ReturnType = ActionState<InputType, Board>