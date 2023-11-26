'use server'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './type'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/createSafeActions'
import { deleteSchema } from './schema'
import { redirect } from 'next/navigation'
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
  let deleteList
  try {
    deleteList = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    })
         await createAuditLog({
           action: ACTION.DELETE,
           entityType: ENTITY_TYPE.CARD,
           entityId: deleteList.id,
           entityTitle: deleteList.title,
         })
  } catch (error) {
    return {
      error: 'something went wrong',
    }
  } 

  revalidatePath(`/board/${boardId}`)
  return {
    data: deleteList,
  }
}
export const deleteList = createSafeAction(deleteSchema, handler)
