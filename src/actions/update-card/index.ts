"use server"
import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/createSafeActions'
import { updateCardSchema } from './schema'
import { InputType, ReturnType } from './type'
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
  } catch (error) {
    return { error: 'something went wrong' }
  }
  revalidatePath(`/board/${boardId}`)
  return { data: card }
}

export const updateCard = createSafeAction(updateCardSchema, handler)
