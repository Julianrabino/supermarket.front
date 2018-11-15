import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginUser } from './login-user.model';
import { ConfigService } from '../config/config.service';
import { Usuario } from './usuario.model';
import { SessionService } from '../storage/session.service';
import { BonitaService } from '../bonita/bonita.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private sessionService: SessionService,
    private bonitaService: BonitaService) { }

  public LogIn(loginUser: LoginUser): Promise<Usuario> {
    const promise = new Promise<Usuario>((resolve, reject) => {
      const options = loginUser ?
      { params: new HttpParams()
          .set('nombre', loginUser.nombre.toLowerCase())
          .set('password', loginUser.password)
      } : {};
      this.http.get<Usuario[]>(this.configService.Config.usersUrl, options).toPromise().then(
        res => {
          this.sessionService.set(this.configService.Config.sessionKeys.currentUser, res[0]);
          resolve(res[0]);
        },
        err => { reject(err); }
      );
    });
    return promise;
  }

  public LogOut(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
        this.sessionService.set(this.configService.Config.sessionKeys.currentUser, null);
        this.bonitaService.LogOut().then(
          res => {
            this.sessionService.set(this.configService.Config.sessionKeys.currentBonitaApiToken, null);
            resolve(res);
          });
      });
    return promise;
  }

  public GetCurrentUser(): Promise<Usuario> {
    const promise = new Promise<Usuario>((resolve, reject) => {
        resolve(this.sessionService.get(this.configService.Config.sessionKeys.currentUser));
      });
    return promise;
  }
}
