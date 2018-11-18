import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { SessionService } from '../../session/session.service';
import { BonitaActivity } from '../bonita-shared.model';
import { BonitaHumanTask, BonitaHumanTaskSetState } from './bonita-human-task.model';

@Injectable({
  providedIn: 'root'
})
export class BonitaHumanTaskService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private sessionService: SessionService) {
      this.apiUrl = this.configService.Config.bonita.urls.humanTasks;
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  public async whaitFor(caseId: string, name: string): Promise<BonitaActivity> {
    let result;
    let cantidadIntentos = this.configService.Config.bonita.cantidadIntentosPolling;
    let fin = false;
    while (!fin && cantidadIntentos > 0) {
      await this.getCurrent(caseId).then(
        task => {
          if (task && (task.name === name)) {
            result = task;
            fin = true;
          } else {
            cantidadIntentos--;
          }
        },
        error => {
          fin = true;
        }
      );
      if (!result) {
        await this.delay(this.configService.Config.bonita.msDelayPolling);
      }
    }
    return result;
  }

  public getCurrent(caseId: string): Promise<BonitaHumanTask> {
    const promise = new Promise<BonitaHumanTask>((resolve, reject) => {
      const headers: HttpHeaders = new HttpHeaders().set(
        this.configService.Config.bonita.apiTokenHeader,
        this.sessionService.currentBonitaApiToken);
      const params = '?p=0&c=10&f=rootCaseId=' + caseId;
      this.http.get<BonitaHumanTask[]>(this.apiUrl + params, { headers: headers }).toPromise().then(
          resp => {
            resolve(resp[0]);
            // this.sessionService.currentActivity = resp;
            // if (resp) {
            //   if (resp?.state === 'failed') {
            //     reject('fallo la actividad!!');
            //   } else {
            //     resolve(resp);
            //   }
            // }
          },
          err => { reject(err); }
      );
    });
    return promise;
  }

  public complete(taskId: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const headers: HttpHeaders = new HttpHeaders()
        .set(
          this.configService.Config.bonita.apiTokenHeader,
          this.sessionService.currentBonitaApiToken)
        .set('Content-Type', 'application/json');

      const params = '/' + taskId;
      const body = new BonitaHumanTaskSetState(this.configService.Config.bonita.humanTaskAssignedId, 'completed');
      this.http.put(this.apiUrl + params, body, { headers: headers }).toPromise().then(
        res => resolve('OK'),
        error => reject(error)
      );
    });
  }
}
