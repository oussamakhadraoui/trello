'use server'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './type'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/createSafeActions'
import { deleteSchema } from './schema'


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
    deleteList = await db.card.delete({
      where: {
        id,
        
        list: {
          board:{
            orgId
          },
        },
      },
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
export const deleteCard = createSafeAction(deleteSchema, handler)
