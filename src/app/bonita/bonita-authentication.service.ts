import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from '../storage/session.service';

@Injectable({
  providedIn: 'root'
})
export class BonitaAuthenticationService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private cookieService: CookieService,
    private sessionService: SessionService) {
  }

  public LogIn(): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      const loginHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

      const loginBody: string = 'username=' + this.configService.Config.bonitaLoginUsername +
        '&password=' + this.configService.Config.bonitaLoginPassword + '&redirect=false';

      this.http.post(this.configService.Config.bonitaLoginService, loginBody,
        { headers: loginHeaders, observe: 'response', responseType: 'text'})
        .toPromise().then(
          resp => { resolve(this.cookieService.get('X-Bonita-API-Token')); },
          err => { reject(err); }
      );
    });
    return promise;
  }

  public LogOut(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      const loginHeaders: HttpHeaders = new HttpHeaders().set(
        this.configService.Config.bonitaApiTokenHeader,
        this.sessionService.get(this.configService.Config.sessionKeys.currentBonitaApiToken));

      const params = 'redirect=false';

      this.http.get(this.configService.Config.bonitaLogoutService + '?' + params, { headers: loginHeaders }).toPromise().then(
          resp => { resolve(true); },
          err => { reject(err); });
    });
    return promise;
  }
}
