'use server'
import { createSafeAction } from '../../lib/createSafeActions'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './type'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { updateListOrderSchema } from './schema'

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
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

  let newList
  try {
    const transaction = items.map((item) =>
      db.list.update({
        where: { id: item.id, board: { orgId } },
        data: { order: item.order },
      })
    )
    newList = await db.$transaction(transaction)
  } catch (error) {
    return {
      error: 'something went wrong',
    }
  }
  revalidatePath(`/board/${boardId}`)
  return {
    data: newList,
  }
}

export const updateListOrder = createSafeAction(updateListOrderSchema, handler)
