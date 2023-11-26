import { ACTION, AuditLog, ENTITY_TYPE } from "@prisma/client";

export const generateLogMessage = (data:AuditLog) => {
const {entityType,action,entityTitle}=data

switch (action){
 case ACTION.CREATE:
  return `Created ${entityType} ${entityTitle}`
 case ACTION.UPDATE:
  return `Updated ${entityType} ${entityTitle}`
 case ACTION.DELETE:
  return `Deleted ${entityType} ${entityTitle}`
}
}