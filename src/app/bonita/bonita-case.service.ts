import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { SessionService } from '../storage/session.service';
import { BonitaVariable } from './bonita.model';
import { BonitaCaseStarted } from './bonita-case.model';

@Injectable({
  providedIn: 'root'
})
export class BonitaCaseService {

  private resourceUrl: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private sessionService: SessionService) {
      this.resourceUrl = this.configService.Config.bonitaCases;
  }

  public start(): Promise<number> {
    const promise = new Promise<number>((resolve, reject) => {
      const headers: HttpHeaders = new HttpHeaders().set(
        this.configService.Config.bonitaApiTokenHeader,
        this.sessionService.currentBonitaApiToken)
        .set('Content-Type', 'application/json');

      const body = {
        processDefinitionId: this.configService.Config.bonita.processDefinitionId,
        variables: [ new BonitaVariable(this.configService.Config.bonita.variables.nroDocumento, 30912124) ]
      };

      this.http.post<BonitaCaseStarted>(this.configService.Config.bonita.urls.cases, body,
        { headers: headers })
        .toPromise().then(
          resp => {
            this.sessionService.currentCase = resp.rootCaseId;
            resolve(resp.rootCaseId);
          },
          err => { reject(err); }
      );
    });
    return promise;
  }
}
