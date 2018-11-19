import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/config/config.service';
import { BonitaActivity } from '../bonita-shared.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class BonitaActitivyService {

  constructor(
    private configService: ConfigService,
    private sessionService: SessionService,
    private http: HttpClient
  ) { }

  public getForCase(caseId: string): Promise<BonitaActivity[]> {
    return new Promise<BonitaActivity[]>((resolve, reject) => {
      const headers: HttpHeaders = new HttpHeaders().set(
        this.configService.Config.bonita.apiTokenHeader,
        this.sessionService.currentBonitaApiToken);
      const params = '?p=0&c=' +
        this.configService.Config.bonita.cantidadElementosPagina + '&f=rootCaseId=' + caseId;
      this.http.get<BonitaActivity[]>(this.configService.Config.bonita.urls.activities + params,
        { headers: headers }).toPromise().then(
          resp => {
            resolve(resp);
          },
          err => { reject(err); }
      );
    });
  }
}
