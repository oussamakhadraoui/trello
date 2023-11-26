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
  const { id } = data
  let deleteBoard
  try {
    deleteBoard = await db.board.delete({
      where: {
        id,
        orgId,
      },
    })
    await createAuditLog({
      action: ACTION.DELETE,
      entityType: ENTITY_TYPE.BOARD,
      entityId: deleteBoard.id,
      entityTitle: deleteBoard.title,
    })
  } catch (error) {
    return {
      error: 'something went wrong',
    }
  }

  revalidatePath(`/organization/${orgId}`)
  redirect(`/organization/${orgId}`)
}
export const deleteBoard = createSafeAction(deleteSchema, handler)
