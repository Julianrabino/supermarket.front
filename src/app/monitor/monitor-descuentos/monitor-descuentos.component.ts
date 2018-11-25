import { Component, OnInit } from '@angular/core';
import { MonitorDescuentosService } from './monitor-descuentos.service';
import { ItemDescuentoVenta } from './monitor-descuentos.model';
import { ErrorService } from 'src/app/error/error.service';

@Component({
  selector: 'app-monitor-descuentos',
  templateUrl: './monitor-descuentos.component.html',
  styleUrls: ['./monitor-descuentos.component.css']
})
export class MonitorDescuentosComponent implements OnInit {

  descuentosVenta: ItemDescuentoVenta[];

  constructor(
    private monitorDescuentosService: MonitorDescuentosService,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.monitorDescuentosService.obtenerDecuentosVentas(0).then(
      res => {
        this.descuentosVenta = res;
      })
    .catch(error => {
      this.errorService.handle(error);
    });
  }

}
