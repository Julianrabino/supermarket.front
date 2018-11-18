export declare type BonitaActivityStateType =
'failed' |
'initializing' |
'ready' |
'executing' |
'completing' |
'completed' |
'waiting' |
'skipped' |
'cancelled' |
'aborted' |
'cancelling subtasks';

export declare type BonitaActivityType =
'AUTOMATIC_TASK' |
'HUMAN_TASK' |
'USER_TASK' |
'MANUAL_TASK' |
'LOOP_ACTIVITY' |
'MULTI_INSTANCE_ACTIVITY' |
'SUB_PROCESS';


export declare type BonitaActivityPriorityType =
'highest' |
'above_normal' |
'normal' |
'under_normal' |
'lowest';

export class BonitaActivity {
    displayDescription: string;
    executedBy: string;
    rootContainerId: string;
    assigned_date: Date;
    displayName: string;
    executedBySubstitute: string;
    dueDate: Date;
    description: string;
    type: BonitaActivityType;
    priority: BonitaActivityPriorityType;
    actorId: string;
    processId: string;
    caseId: string;
    name: string;
    reached_state_date: Date;
    rootCaseId: string;
    id: string;
    state: BonitaActivityStateType;
    parentCaseId: string;
    last_update_date: Date;
    assigned_id: string;
}
