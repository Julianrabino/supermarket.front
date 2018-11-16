import { Injectable } from '@angular/core';
import { Usuario } from '../login/usuario.model';
import { ConfigService } from '../config/config.service';

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

  get currentCase(): number {
    return this.get(this.configService.Config.sessionKeys.currentCaseId);
  }

  set currentCase(caseId: number) {
    this.set(this.configService.Config.sessionKeys.currentCaseId, caseId);
  }

  get currentBonitaApiToken(): string {
    return this.get(this.configService.Config.sessionKeys.currentBonitaApiToken);
  }

  set currentBonitaApiToken(token: string)  {
    this.set(this.configService.Config.sessionKeys.currentBonitaApiToken, token);
  }
}
