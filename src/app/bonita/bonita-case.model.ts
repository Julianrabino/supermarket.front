export class BonitaCaseStarted {
    end_date: Date;
    processDefinitionId: number;
    start: Date;
    rootCaseId: number;
    id: number;
    state: BonitaCaseState;
    started_by: number;
    last_update_date: Date;
    startedBySubstitute: number;
}

export declare type BonitaCaseState = 'INITIALIZING' | 'STARTED' | 'SUSPENDED' | 'CANCELLED' |
     'ABORTED' | 'COMPLETING' | 'COMPLETED' | 'ERROR' | 'ABORTING' | 'initializing' | 'started' |
     'suspended' | 'cancelled' | 'aborted' | 'completing' | 'completed' | 'error' | 'aborting';
