'use server'
import { createSafeAction } from '../../lib/createSafeActions'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './type'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { updateCardOrderSchema } from './schema'

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId,  } = auth()
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { items, boardId } = data
  if (!items || !boardId) {
    return {
      error: 'title is required',
    }
  }

  let newCard
  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: { id: card.id, list: { board: { orgId } } },
        data: { order: card.order,listId:card.listId },
      })
    )
    newCard= await db.$transaction(transaction)
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

export const updateCardOrder = createSafeAction(updateCardOrderSchema, handler)
