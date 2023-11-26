"use server"
import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/createSafeActions'
import { titleSchema } from './schema'
import { InputType, ReturnType } from './type'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }
  const { title,id } = data
  if (!title) {
    return {
      error: 'you must provide a title',
    }
  }
  let updateBoard
  try {
    updateBoard = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    })
        await createAuditLog({
          action: ACTION.UPDATE,
          entityType: ENTITY_TYPE.BOARD,
          entityId: updateBoard.id,
          entityTitle: updateBoard.title,
        })
  } catch (error) {
    return { error: 'something went wrong' }
  }
  revalidatePath(`/board/${id}`)
  return { data: updateBoard }
}

export const updateBoard = createSafeAction(titleSchema, handler)
