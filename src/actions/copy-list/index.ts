'use server'
import { auth } from '@clerk/nextjs'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/createSafeActions'
import { listCopySchema } from './schema'
import { InputType, ReturnType } from './type'
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
  let copyList
  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    })

    if (!listToCopy) {
      return {
        error: 'This list does not exist',
      }
    }
    const finalListCard = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })
    const order = finalListCard ? finalListCard.order + 1 : 1

    copyList = await db.list.create({
      data: {
        title: `${listToCopy.title} -copy`,
        boardId: listToCopy.boardId,
        order,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    })
  } catch (error) {
    return { error: 'something went wrong' }
  }
  revalidatePath(`/board/${boardId}`)
  return { data: copyList }
}

export const copyList = createSafeAction(listCopySchema, handler)
