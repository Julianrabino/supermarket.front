import { Injectable } from '@angular/core';
import { BonitaCaseService } from '../bonita/case/bonita-case.service';
import { ConfigService } from '../config/config.service';
import { Producto } from './producto.model';
import { SessionService } from '../storage/session.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private configService: ConfigService,
    private bonitaCaseService: BonitaCaseService,
    private sessionService: SessionService
  ) { }

  public getProductos(): Promise<Producto[]> {
    const promise = new Promise<Producto[]>((resolve, reject) => {
      this.bonitaCaseService.getCaseVariable(
        this.sessionService.currentCase.id, this.configService.Config.bonita.variables.productos).then(
          res => { resolve(JSON.parse(res.value)); },
          error => { reject(error); }
        );
    });
    return promise;
  }
}
