import { auth, currentUser } from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
import { db } from './db'
interface Props {
  entityId: string
  entityType: ENTITY_TYPE
  entityTitle: string
  action: ACTION
}

export const createAuditLog = async (Props: Props) => {
  try {
    const { orgId } = auth()
    const user = await currentUser()
    if (!user || !orgId) {
      throw new Error('User Not Found')
    }
    const { entityId, entityType, entityTitle, action } = Props

    await db.auditLog.create({
      data: {
        orgId,
        entityType,
        entityId,
        entityTitle,
        action,
        userId: user.id,
        userImage: user.imageUrl,
        userName: user?.firstName + ' ' + user?.lastName,
      },
    })
  } catch (error) {
    console.log('log', error)
  }
}
