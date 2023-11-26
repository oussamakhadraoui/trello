"use server"
import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/createSafeActions'
import { updateCardSchema } from './schema'
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
  const { id,boardId,...values } = data

  let card
  try {
    card = await db.card.update({
      where: {
        id,
        list:{board:{orgId}},
      },
      data: {
        ...values,
      },
    })
           await createAuditLog({
             action: ACTION.UPDATE,
             entityType: ENTITY_TYPE.CARD,
             entityId: card.id,
             entityTitle: card.title,
           })
  } catch (error) {
    return { error: 'something went wrong' }
  }
  revalidatePath(`/board/${boardId}`)
  return { data: card }
}

export const updateCard = createSafeAction(updateCardSchema, handler)
