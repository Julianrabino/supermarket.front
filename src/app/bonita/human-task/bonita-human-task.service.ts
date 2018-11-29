import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { SessionService } from '../../session/session.service';
import { BonitaActivity, BonitaError } from '../bonita-shared.model';
import { BonitaHumanTask, BonitaHumanTaskSetState } from './bonita-human-task.model';
import { BonitaActitivyService } from '../activity/bonita-actitivy.service';

@Injectable({
  providedIn: 'root'
})
export class BonitaHumanTaskService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private sessionService: SessionService,
    private bonitaActivityService: BonitaActitivyService
    ) {
      this.apiUrl = this.configService.Config.bonita.urls.humanTasks;
    }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  public async whaitFor(caseId: string, name: string, anotherId?: string): Promise<BonitaActivity> {
    let result;
    let cantidadIntentos = this.configService.Config.bonita.cantidadIntentosPolling;
    const reintentoPolling = this.configService.Config.bonita.reintentoPolling;
    let fin = false;
    while (!fin && cantidadIntentos > 0) {
      await this.getCurrent(caseId).then(
        task => {
          if (task && (task.name === name && (!anotherId || (task.id !== anotherId)))) {
            result = task;
            fin = true;
          } else {
            cantidadIntentos--;
          }
        },
        error => {
          throw new BonitaError('Ha ocurrido un error inesperado');
        }
      );
      if (!result) {
        await this.delay(this.configService.Config.bonita.msDelayPolling);

        if (cantidadIntentos === 0) {
          const activities = await this.bonitaActivityService.getForCase(caseId);
          if (activities) {
            const failedIndex = activities.findIndex(a => a.state === 'failed');
            if (failedIndex !== -1) {
              throw new BonitaError('Ha ocurrido un error ' + activities[failedIndex].description);
            } else {
              if (reintentoPolling) {
                cantidadIntentos = this.configService.Config.bonita.cantidadIntentosPolling;
              }
            }
          }
        }
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
