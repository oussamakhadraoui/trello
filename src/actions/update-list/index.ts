"use server"
import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/createSafeActions'
import { listSchema } from './schema'
import { InputType, ReturnType } from './type'
const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }
  const { title, id, boardId } = data
  if (!title) {
    return {
      error: 'you must provide a title',
    }
  }
  let updateList
  try {
    updateList = await db.list.update({
      where: {
        id,
        boardId,
        board:{
          orgId
        }

      },
      data: {
        title,
      },
    })
  } catch (error) {
    return { error: 'something went wrong' }
  }
  revalidatePath(`/board/${boardId}`)
  return { data: updateList }
}

export const updateList = createSafeAction(listSchema, handler)
