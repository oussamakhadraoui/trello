import * as zod from 'zod'
import { listSchema} from './schema'
import { ActionState } from '@/lib/createSafeActions'
import {  List } from '@prisma/client'
export type InputType = zod.infer<typeof listSchema> 

export type ReturnType = ActionState<InputType, List>