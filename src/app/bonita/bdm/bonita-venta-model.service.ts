import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/config/config.service';
import { BonitaVentaModel } from './venta.model';
import { SessionService } from 'src/app/session/session.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BonitaVentaModelService {

  constructor(
    private configService: ConfigService,
    private sessionService: SessionService,
    private http: HttpClient
  ) { }

  public obtenerPorVentaId(ventaId: string): Promise<BonitaVentaModel[]> {
    return new Promise<BonitaVentaModel[]>((resolve, reject) => {
      const headers: HttpHeaders = new HttpHeaders().set(
        this.configService.Config.bonita.apiTokenHeader,
        this.sessionService.currentBonitaApiToken);

      const params = '?q=findByVentaId&p=0&c=' +
        this.configService.Config.bonita.cantidadElementosPagina + '&f=ventaId=' + ventaId;

      this.http.get<BonitaVentaModel[]>(this.configService.Config.bonita.urls.businessDataVenta + params,
        { headers: headers }).toPromise().then(
          resp => {
            resolve(resp);
          },
          err => { reject(err); }
      );
    });
  }
}
