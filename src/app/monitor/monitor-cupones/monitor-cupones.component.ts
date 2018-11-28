import { Component, OnInit } from '@angular/core';
import { ItemCuponVenta } from './monitor-cupones.model';
import { MonitorCuponesService } from './monitor-cupones.service';
import { ErrorService } from 'src/app/error/error.service';
import { ConfigService } from 'src/app/config/config.service';
import { animacionVerticalExpand } from 'src/app/animations/animacion-vertical-expand';

@Component({
  selector: 'app-monitor-cupones',
  templateUrl: './monitor-cupones.component.html',
  styleUrls: ['./monitor-cupones.component.css'],
  animations: [ animacionVerticalExpand ]
})
export class MonitorCuponesComponent implements OnInit {

  ventas: ItemCuponVenta[];
  cantidadVentas: number;
  paginaActual: number;
  itemsPorPagina: number;

  constructor(
    private monitorCuponesService: MonitorCuponesService,
    private errorService: ErrorService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.itemsPorPagina = this.configService.Config.bonita.cantidadElementosPagina;
    this.monitorCuponesService.obtenerCantidadCuponesVenta().then(
      cant => {
        this.cantidadVentas = cant;
        if (this.cantidadVentas > 0) {
          this.paginaActual = 0;
          this.monitorCuponesService.obtenerCuponesVentas(this.paginaActual).then(
            res => {
              this.ventas = res;
            }
          );
        } else {
          this.ventas = [];
        }
      }
    )
    .catch(error => {
      this.errorService.handle(error);
    });
  }

  public pageChanged(event) {
    this.paginaActual = event.page - 1;
    this.monitorCuponesService.obtenerCuponesVentas(this.paginaActual).then(
      res => {
        this.ventas = res;
      })
    .catch(error => {
        this.errorService.handle(error);
      });
  }

}
