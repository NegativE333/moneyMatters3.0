import { ACTION, AuditLog } from "@prisma/client";


export const generateLogMessage = (log : AuditLog) => {
    const { action, entityTitle, entityType } = log;

    if(entityTitle === "welcomeExpenseUnique"){
        return "joined."
    }

    switch(action){
        case ACTION.CREATE:
            return `created "${entityTitle}" ${entityType.toLowerCase()}`;
        case ACTION.DELETE:
            return `deleted "${entityTitle}" ${entityType.toLowerCase()}`;
        default:
            return `unknown action`;
    }
}