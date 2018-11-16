export class BonitaVariable {
    name: string;
    value: any;

    constructor(name: string, value: any) {
        this.name = name;
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
