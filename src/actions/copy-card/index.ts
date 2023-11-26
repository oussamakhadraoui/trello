'use server'
import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/createSafeActions'
import { cardCopySchema } from './schema'
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
  const { id, boardId } = data
  if (!id) {
    return {
      error: 'This list does not exist',
    }
  }
  let copyCard
  try {
    const cardToCopy = await db.card.findUnique({
      where: { id, list: { board: { orgId } } },
    })
    if (!cardToCopy) {
      return {
        error: 'no Card to copy',
      }
    }
    const lastCard = await db.card.findFirst({
      where: { listId: cardToCopy?.listId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const order = lastCard?.order ? lastCard.order + 1 : 1
    copyCard = await db.card.create({
      data: {
        title: `copy of ${cardToCopy?.title}`,
        description: cardToCopy?.description,
        listId: cardToCopy.listId,
        order,
      },
    })
    await createAuditLog({
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.CARD,
      entityId: copyCard.id,
      entityTitle: copyCard.title,
    })
  } catch (error) {
    return { error: 'something went wrong' }
  }
  revalidatePath(`/board/${boardId}`)
  return { data: copyCard }
}

export const copyCard = createSafeAction(cardCopySchema, handler)
