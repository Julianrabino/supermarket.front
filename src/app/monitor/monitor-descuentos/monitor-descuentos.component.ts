import { Component, OnInit } from '@angular/core';
import { MonitorDescuentosService } from './monitor-descuentos.service';
import { ItemDescuentoVenta } from './monitor-descuentos.model';
import { ErrorService } from 'src/app/error/error.service';
import { ConfigService } from 'src/app/config/config.service';
import { animacionVerticalExpand } from 'src/app/animations/animacion-vertical-expand';

@Component({
  selector: 'app-monitor-descuentos',
  templateUrl: './monitor-descuentos.component.html',
  styleUrls: ['./monitor-descuentos.component.css'],
  animations: [ animacionVerticalExpand ]
})
export class MonitorDescuentosComponent implements OnInit {

  descuentosVenta: ItemDescuentoVenta[];
  cantidadDescuentosVenta: number;
  paginaActual: number;
  itemsPorPagina: number;

  constructor(
    private monitorDescuentosService: MonitorDescuentosService,
    private errorService: ErrorService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.itemsPorPagina = this.configService.Config.bonita.cantidadElementosPagina;
    this.monitorDescuentosService.obtenerCantidadDescuentosVenta().then(
      cant => {
        this.cantidadDescuentosVenta = cant;
        if (this.cantidadDescuentosVenta > 0) {
          this.paginaActual = 0;
          this.monitorDescuentosService.obtenerDecuentosVentas(this.paginaActual).then(
            res => {
              this.descuentosVenta = res;
            }
          );
        }
      }
    )
    .catch(error => {
      this.errorService.handle(error);
    });
  }

  public borrarElementos() {
    this.descuentosVenta.splice(0, this.itemsPorPagina);
  }

  public pageChanged(event) {
    this.paginaActual = event.page - 1;
    this.monitorDescuentosService.obtenerDecuentosVentas(this.paginaActual).then(
      res => {
        this.descuentosVenta = res;
      })
    .catch(error => {
        this.errorService.handle(error);
      });
  }
}
