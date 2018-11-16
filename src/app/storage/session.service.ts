import { Injectable } from '@angular/core';
import { Usuario } from '../login/usuario.model';
import { ConfigService } from '../config/config.service';
import { BonitaCase } from '../bonita/case/bonita-case.model';
import { BonitaActivity } from '../bonita/bonita-shared.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private configService: ConfigService) { }

  public set(key: string, value: any): any {
    sessionStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  public get(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  get currentUser(): Usuario {
    return this.get(this.configService.Config.sessionKeys.currentUser);
  }

  set currentUser(user: Usuario) {
    this.set(this.configService.Config.sessionKeys.currentUser, user);
  }

  get currentBonitaApiToken(): string {
    return this.get(this.configService.Config.sessionKeys.currentBonitaApiToken);
  }

  set currentBonitaApiToken(token: string)  {
    this.set(this.configService.Config.sessionKeys.currentBonitaApiToken, token);
  }

  get currentActivity(): BonitaActivity {
    return this.get(this.configService.Config.sessionKeys.currentTaskId);
  }

  set currentActivity(activity: BonitaActivity) {
    this.set(this.configService.Config.sessionKeys.currentTaskId, activity);
  }

  get currentCase(): BonitaCase {
    return this.get(this.configService.Config.sessionKeys.currentCaseId);
  }

  set currentCase(caso: BonitaCase) {
    this.set(this.configService.Config.sessionKeys.currentCaseId, caso);
  }

  public clean(): void {
    this.currentActivity = null;
    this.currentBonitaApiToken = null;
    this.currentCase = null;
    this.currentUser = null;
  }
}
