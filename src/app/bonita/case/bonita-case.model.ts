export class BonitaCase {
    end_date: Date;
    processDefinitionId: string;
    start: Date;
    rootCaseId: string;
    id: string;
    state: BonitaCaseState;
    started_by: string;
    last_update_date: Date;
    startedBySubstitute: string;
}

export declare type BonitaCaseState = 'INITIALIZING' | 'STARTED' | 'SUSPENDED' | 'CANCELLED' |
     'ABORTED' | 'COMPLETING' | 'COMPLETED' | 'ERROR' | 'ABORTING' | 'initializing' | 'started' |
     'suspended' | 'cancelled' | 'aborted' | 'completing' | 'completed' | 'error' | 'aborting';
