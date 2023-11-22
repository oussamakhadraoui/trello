import * as zod from 'zod'
import { listCopySchema } from './schema'
import { ActionState } from '@/lib/createSafeActions'
import {  List } from '@prisma/client'
export type InputType = zod.infer<typeof listCopySchema> 

export type ReturnType = ActionState<InputType, List>