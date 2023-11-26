'use server'
import { createSafeAction } from './../../lib/createSafeActions'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './type'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createListSchema } from './schema'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

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

  let newList
  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    })
    if (!board) {
      return {
        error: 'Board Not found',
      }
    }
    const lastLast = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: 'desc',
      },
      select: {
        order: true,
      },
    })
    const order = lastLast ? lastLast.order + 1 : 1
    newList = await db.list.create({
      data: {
        title,
        boardId,
        order,
      },
    })
    await createAuditLog({
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.LIST,
      entityId: newList.id,
      entityTitle: newList.title,
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

export const createList = createSafeAction(createListSchema, handler)
