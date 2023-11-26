
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ENTITY_TYPE } from '@prisma/client';
export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
try {
 const {userId,orgId}= auth()
 if(!userId||!orgId){
return new NextResponse('Unauthorize',{status:401})
 }

const AuditLog=await db.auditLog.findMany({
  where:{
    orgId,
    entityId:params.cardId,
    entityType:ENTITY_TYPE.CARD,

  },
  orderBy:{
    createdAt:'desc'
  },
  take:3
})
return NextResponse.json(AuditLog)

} catch (error) {
 console.log(error)
 return new NextResponse('internal error', { status: 500 })
}
}
