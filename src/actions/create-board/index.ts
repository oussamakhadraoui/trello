import { Board } from '@prisma/client'
;('use server')

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './type'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/createSafeActions'
import { CreateBoardSchema } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth()
  if (!userId) {
    return {
      error: 'unauthorized',
    }
  }

  const { title } = data
  if (!title) {
    return {
      error: 'title is required',
    }
  }
  let Board
  try {
    Board = await db.oussama.create({
      data: {
        title,
      },
    })
  } catch (error) {
    return {
      error: 'something went wrong',
    }
  }
  revalidatePath(`/board/${Board.id}`)
  return {
    data: Board,
  }
}
export const createBoard = createSafeAction(CreateBoardSchema, handler)
