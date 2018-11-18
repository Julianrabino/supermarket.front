import { BonitaActivity, BonitaActivityStateType } from '../bonita-shared.model';

export class BonitaHumanTask extends BonitaActivity {
}

export class BonitaHumanTaskSetState {
    assigned_id: string;
    state: BonitaActivityStateType;

    constructor(assigned_id: string, state: BonitaActivityStateType) {
        this.assigned_id = assigned_id;
        this.state = state;
    }
}
