import {auth ,currentUser}from '@clerk/nextjs'
import { ACTION, ENTITY_TYPE } from '@prisma/client'
interface Props{
 entityId:string
 entityType:ENTITY_TYPE
 entityTile:string
 action:ACTION
}


export const createAuditLog=async()=>{
 try {
  const{orgId}=auth()
  const user = currentUser()
  if(!user||!orgId){
   throw new Error('User Not Found')
  }
 } catch (error) {
  console.log("log",error)
 }
}