import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BonitaService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private cookieService: CookieService) {
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
        resolve(true);
    });
    return promise;
  }
}
