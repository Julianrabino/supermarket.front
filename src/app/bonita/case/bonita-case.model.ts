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

export class BonitaVariableStart {
    name: string;
    value: any;

    constructor(name: string, value: any) {
        this.name = name;
        this.value = value;
    }
}

export class BonitaVariableSet {
    type: BonitaVariableType;
    value: any;

    constructor(value: any, type: BonitaVariableType) {
        this.type = type;
        this.value = value;
    }
}

export class BonitaVariableData {
    description: string;
    name: string;
    value: string;
    case_id: string;
    type: string;
}

export declare type BonitaCaseState = 'INITIALIZING' | 'STARTED' | 'SUSPENDED' | 'CANCELLED' |
    'ABORTED' | 'COMPLETING' | 'COMPLETED' | 'ERROR' | 'ABORTING' | 'initializing' | 'started' |
    'suspended' | 'cancelled' | 'aborted' | 'completing' | 'completed' | 'error' | 'aborting';

export declare type BonitaVariableType = 'java.lang.Long' | 'java.lang.Integer' | 'java.lang.Boolean' |
    'java.lang.String';
