import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class BonitaService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
  }

  public LogIn(): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type':  'application/x-www-form-urlencoded'
      //   }),
      //   observe: 'response',
      //   responseType: 'text'
      // };
      // const httpBody = {
      //   username: this.configService.Config.bonitaLoginUsername,
      //   password: this.configService.Config.bonitaLoginPassword,
      //   redirect: 'false'
      // };

      const loginHeaders: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

      let loginBody: string = 'username=' + this.configService.Config.bonitaLoginUsername + '&password=' + this.configService.Config.bonitaLoginPassword + '&redirect=false';

      this.http.post(this.configService.Config.bonitaLoginService, loginBody, {
        headers: loginHeaders,
        observe: 'response',
        responseType: 'text'
        }).toPromise().then(
        resp => { resolve(this.getCookie('X-Bonita-API-Token')); },
        err => { reject(err); }
      );
    });
    return promise;
  }
}
