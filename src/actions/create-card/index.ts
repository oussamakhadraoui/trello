'use server'
import { createSafeAction } from '../../lib/createSafeActions'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './type'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createCardSchema } from './schema'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { title, boardId, listId } = data
  if (!title || !boardId) {
    return {
      error: 'title is required',
    }
  }

  let newCard
  try {
    const list = await db.list.findFirst({
      where: {
        id: listId,
   
        board: {
          orgId,
        },
      },
    })
    if (!list) {
      return {
        error: 'List not found',
      }
    }
    const finalCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: 'asc' },
      select: {
        order: true,
      },
    })

    const finalOrder=finalCard? finalCard.order+1:1
    newCard = await db.card.create({
      data: {
        title,
        order:finalOrder,
        listId,
      },
    })
    await createAuditLog({
      entityId: newCard.id,
      entityType: ENTITY_TYPE.CARD,
      entityTitle:newCard.title,
      action: ACTION.CREATE,
    })
  } catch (error) {
    return {
      error: 'something went wrong',
    }
  }
  revalidatePath(`/board/${boardId}`)
  return {
    data: newCard,
  }
}

export const createCard = createSafeAction(createCardSchema, handler)
