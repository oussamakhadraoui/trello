'use server'

import { auth } from '@clerk/nextjs'
import { InputType, ReturnType } from './type'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSafeAction } from '@/lib/createSafeActions'
import { deleteSchema } from './schema'
import { redirect } from 'next/navigation'

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth()
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    }
  }
  const { id } = data
  let deleteBoard
  try {
    deleteBoard = await db.board.delete({
      where: {
        id,
        orgId,
      },
    })
 
  } catch (error) {
    return {
      error: 'something went wrong',
    }
  }

  revalidatePath(`/organization/${orgId}`)
  redirect(`/organization/${orgId}`)

}
export const deleteBoard = createSafeAction(deleteSchema, handler)

