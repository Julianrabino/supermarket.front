import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { SessionService } from '../../session/session.service';
import { BonitaVariable, BonitaActivity } from '../bonita-shared.model';
import { BonitaHumanTask } from './bonita-human-task.model';

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

  // public async whaitFor(name: string): Promise<BonitaActivity> {
  //   const promise = new Promise<BonitaHumanTask>((resolve, reject) => {
  //     let cantidadIntentos = 5;
  //     let fin = false;
  //     while (!fin && cantidadIntentos > 0) {
  //       await this.getCurrent().then(
  //         task => {
  //           if (task.name === name) {
  //             fin = true;
  //             resolve(task);
  //           } else {
  //             cantidadIntentos--;
  //           }
  //         },
  //         error => {
  //           fin = true;
  //           reject(error);
  //         }
  //       );
  //     }
  //     if (!fin) { reject('No se encontró la tarea ' +  name); }
  //   });
  //   return promise;
  // }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  public async whaitFor(name: string): Promise<BonitaActivity> {
    let result;
    let cantidadIntentos = 10;
    let fin = false;
    while (!fin && cantidadIntentos > 0) {
      await this.getCurrent().then(
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
        await this.delay(500);
      }
    }
    return result;
  }

  public getCurrent(): Promise<BonitaHumanTask> {
    const promise = new Promise<BonitaHumanTask>((resolve, reject) => {
      const headers: HttpHeaders = new HttpHeaders().set(
        this.configService.Config.bonita.apiTokenHeader,
        this.sessionService.currentBonitaApiToken);
      const params = '?p=0&c=10&f=rootCaseId=' + this.sessionService.currentCase.id;
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
}
