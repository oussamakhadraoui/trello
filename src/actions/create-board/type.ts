
import * as zod from 'zod'
import { CreateBoardSchema } from './schema'
import { ActionState } from '@/lib/createSafeActions'
import { oussama } from '@prisma/client'



export type InputType = zod.infer<typeof CreateBoardSchema>
export type ReturnType = ActionState<InputType, oussama>
