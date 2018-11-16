import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginUser } from './login-user.model';
import { ConfigService } from '../config/config.service';
import { Usuario } from './usuario.model';
import { SessionService } from '../storage/session.service';
import { BonitaAuthenticationService } from '../bonita/bonita-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private sessionService: SessionService,
    private bonitaAuthenticationService: BonitaAuthenticationService) { }

  public logIn(loginUser: LoginUser): Promise<Usuario> {
    const promise = new Promise<Usuario>((resolve, reject) => {
      const options = loginUser ?
      { params: new HttpParams()
          .set('nombre', loginUser.nombre.toLowerCase())
          .set('password', loginUser.password)
      } : {};
      this.http.get<Usuario[]>(this.configService.Config.usersUrl, options).toPromise().then(
        usuarios => {
          this.sessionService.currentUser = usuarios[0];
          this.bonitaAuthenticationService.logIn().then(
            token => {
              this.sessionService.currentBonitaApiToken = token;
              resolve(usuarios[0]);
            });
        },
        err => { reject(err); }
      );
    });
    return promise;
  }

  public logOut(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
        this.sessionService.currentUser = null;
        this.bonitaAuthenticationService.logOut().then(
          res => {
            this.sessionService.currentBonitaApiToken = null;
            resolve(true);
          });
      });
    return promise;
  }

  public GetCurrentUser(): Promise<Usuario> {
    const promise = new Promise<Usuario>((resolve, reject) => {
        resolve(this.sessionService.currentUser);
      });
    return promise;
  }
}
