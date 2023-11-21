'use server'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './type'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { title, boardId } = data
  if (!title || !boardId) {
    return {
      error: 'title is required',
    }
  }
  const lastItem = await db.list.findFirst({
    where: {
      boardId,
    },
  })
  const order = lastItem ? lastItem.order + 1 : 0
  let newList
  try {
    newList = await db.list.create({
      data: {
        title,
        boardId,
        order,
      },
    })
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
