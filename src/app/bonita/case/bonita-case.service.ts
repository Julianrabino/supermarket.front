import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { SessionService } from '../../storage/session.service';
import { BonitaVariable, BonitaVariableData } from '../bonita-shared.model';
import { BonitaCase } from './bonita-case.model';

@Injectable({
  providedIn: 'root'
})
export class BonitaCaseService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private sessionService: SessionService) {
      this.apiUrl = this.configService.Config.bonita.urls.cases;
  }

  public start(): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
      const headers: HttpHeaders = new HttpHeaders().set(
        this.configService.Config.bonita.apiTokenHeader,
        this.sessionService.currentBonitaApiToken)
        .set('Content-Type', 'application/json');

      const body = {
        processDefinitionId: this.configService.Config.bonita.processDefinitionId,
        variables: [ new BonitaVariable(this.configService.Config.bonita.variables.nroDocumento, 30912124) ]
      };

      this.http.post<BonitaCase>(this.apiUrl, body,
        { headers: headers })
        .toPromise().then(
          resp => {
            this.sessionService.currentCase = resp;
            resolve(resp.rootCaseId);
          },
          err => { reject(err); }
      );
    });
    return promise;
  }

  public getCaseVariable(caseId: string, variableName: string): Promise<BonitaVariableData> {
    const promise = new Promise<BonitaVariableData>((resolve, reject) => {
      const headers: HttpHeaders = new HttpHeaders().set(
        this.configService.Config.bonita.apiTokenHeader,
        this.sessionService.currentBonitaApiToken);
      const params = '/' + caseId + '/' + variableName;
      this.http.get<BonitaVariableData>(this.configService.Config.bonita.urls.caseVariable + params,
        { headers: headers }).toPromise().then(
          resp => {
            resolve(resp);
          },
          err => { reject(err); }
      );
    });
    return promise;
  }
}