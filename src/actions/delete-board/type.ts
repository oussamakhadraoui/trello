import { Board } from '@prisma/client';
import { ActionState,  } from './../../lib/createSafeActions';
import { deleteSchema } from "./schema";
import * as zod from 'zod'

export type InputType= zod.infer<typeof deleteSchema>
export type ReturnType = ActionState<InputType, Board>