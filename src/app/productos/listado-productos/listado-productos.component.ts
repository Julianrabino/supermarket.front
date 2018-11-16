import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto.model';
import { SessionService } from 'src/app/storage/session.service';
import { BonitaCaseService } from 'src/app/bonita/case/bonita-case.service';
import { BonitaHumanTaskService } from 'src/app/bonita/human-task/bonita-human-task.service';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
export class ListadoProductosComponent implements OnInit {

  productos: Producto[];
  caseId: string;
  tareaDesc: string;

  constructor(
    private sessionService: SessionService,
    private bonitaCaseService: BonitaCaseService,
    private bonitaHumantaskService: BonitaHumanTaskService,
    private productosService: ProductosService
    ) { }

  ngOnInit() {
    if (!this.sessionService.currentCase) {
      this.bonitaCaseService.start().then(caseId => {
        this.caseId = caseId;
        this.bonitaHumantaskService.whaitFor('IniciarCompra').then(
          actividad => {
            this.sessionService.currentActivity = actividad;
            this.productosService.getProductos().then(
              res => { this.productos = res; }
            );
          },
          error => { this.tareaDesc = error; }
        );
      });
    } else {
      this.caseId = this.sessionService.currentCase.id;
    }
  }
}
