import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginUser } from './login-user.model';
import { ConfigService } from '../config/config.service';
import { Usuario } from './usuario.model';
import { SessionService } from '../session/session.service';
import { BonitaAuthenticationService } from '../bonita/authentication/bonita-authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private sessionService: SessionService,
    private bonitaAuthenticationService: BonitaAuthenticationService,
    private router: Router
  ) { }

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
          if (this.sessionService.currentUser) {
            this.bonitaAuthenticationService.logIn().then(
              token => {
                this.sessionService.currentBonitaApiToken = token;
                resolve(usuarios[0]);
              });
          } else {
            reject('El usuario o contraseña es inválido');
          }
        },
        err => { reject('Error inesperado al iniciar sesión'); }
      );
    });
    return promise;
  }

  public logOut(redirect: boolean = true) {
  // public logOut(): Promise<boolean> {
    // const promise = new Promise<boolean>((resolve, reject) => {
        this.bonitaAuthenticationService.logOut().then(
          res => {
            this.sessionService.clean();
            if (redirect) {
              this.router.navigate(['/login']);
            }
            // resolve(true);
          });
    // });
    // return promise;
  }

  public GetCurrentUser(): Promise<Usuario> {
    const promise = new Promise<Usuario>((resolve, reject) => {
        resolve(this.sessionService.currentUser);
      });
    return promise;
  }
}
