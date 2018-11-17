import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginUser } from './login-user.model';
import { ConfigService } from '../config/config.service';
import { Usuario } from './usuario.model';
import { SessionService } from '../session/session.service';
import { BonitaAuthenticationService } from '../bonita/authentication/bonita-authentication.service';
import { CarritoCompraService } from '../carrito-compra/carrito-compra.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private sessionService: SessionService,
    private bonitaAuthenticationService: BonitaAuthenticationService,
    private carritoCompraService: CarritoCompraService) { }

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
            this.sessionService.currentCart = this.carritoCompraService.nuevoCarrito();
            this.bonitaAuthenticationService.logIn().then(
              token => {
                this.sessionService.currentBonitaApiToken = token;
                resolve(usuarios[0]);
              });
          }
        },
        err => { reject(err); }
      );
    });
    return promise;
  }

  public logOut(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
        this.bonitaAuthenticationService.logOut().then(
          res => {
            this.sessionService.clean();
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
