'use server'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './type'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/createSafeActions'
import { CreateBoardSchema } from './schema'
import { createAuditLog } from '@/lib/create-audit-log'
import { ACTION, ENTITY_TYPE } from '@prisma/client'

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth()

  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }

  const { title, image } = data
  if (!title || !image) {
    return {
      error: 'title is required',
    }
  }
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split('|')

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageUserName ||
    !imageLinkHTML
  ) {
    return {
      error: 'Missing fields. Failed to create board.',
    }
  }

  let board
  try {
    board = await db.board.create({
      data: {
        title,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
        imageThumbUrl,
        orgId,
        imageId,
      },
    })
      await createAuditLog({
        action: ACTION.CREATE,
        entityType: ENTITY_TYPE.BOARD,
        entityId: board.id,
        entityTitle: board.title,
      })
    
  } catch (error) {
    return {
      error: 'something went wrong',
    }
  }
  revalidatePath(`/board/${board.id}`)
  return { data: board }
}

export const createBoard = createSafeAction(CreateBoardSchema, handler)
