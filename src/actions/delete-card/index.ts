'use server'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './type'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/createSafeActions'
import { deleteSchema } from './schema'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'


export const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }
  const { id, boardId } = data
  let deleteCard
  try {
    deleteCard = await db.card.delete({
      where: {
        id,

        list: {
          board: {
            orgId,
          },
        },
      },
    })
        await createAuditLog({
          action: ACTION.DELETE,
          entityType: ENTITY_TYPE.CARD,
          entityId: deleteCard.id,
          entityTitle: deleteCard.title,
        })
  } catch (error) {
    return {
      error: 'something went wrong',
    }
  } 

  revalidatePath(`/board/${boardId}`)
  return {
    data: deleteCard,
  }
}
export const deleteCard = createSafeAction(deleteSchema, handler)
