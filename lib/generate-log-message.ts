import { ACTION, AuditLog } from "@prisma/client";


export const generateLogMessage = (log : AuditLog) => {
    const { action, entityTitle, entityType } = log;

    switch(action){
        case ACTION.CREATE:
            return `created "${entityTitle}" expense`;
        case ACTION.DELETE:
            return `deleted "${entityTitle}" expense`;
        default:
            return `unknown action`;
    }
}