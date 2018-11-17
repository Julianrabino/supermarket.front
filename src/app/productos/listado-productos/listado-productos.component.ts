import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto.model';
import { SessionService } from 'src/app/session/session.service';
import { BonitaCaseService } from 'src/app/bonita/case/bonita-case.service';
import { BonitaHumanTaskService } from 'src/app/bonita/human-task/bonita-human-task.service';
import { ProductosService } from '../productos.service';
import { CarritoCompraService } from 'src/app/carrito-compra/carrito-compra.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
export class ListadoProductosComponent implements OnInit {

  productos: Producto[];
  errorFatal: string;
  mensajeProducto: string;
  mensajeProductoRef: number;
  mensajeProductotipo: 'error' | 'info';
  modoLista: boolean;

  constructor(
    private sessionService: SessionService,
    private bonitaCaseService: BonitaCaseService,
    private bonitaHumantaskService: BonitaHumanTaskService,
    private productosService: ProductosService,
    private carritoCompraService: CarritoCompraService
    ) { }

  ngOnInit() {
    if (!this.sessionService.currentCase) {
      this.bonitaCaseService.start().then(caseId => {
        // this.caseId = caseId;
        this.bonitaHumantaskService.whaitFor('IniciarCompra').then(
          actividad => {
            this.sessionService.currentActivity = actividad;
            this.productosService.getProductos().then(
              res => { this.productos = res; }
            );
          },
          error => { this.errorFatal = error; }
        );
      });
    } else {
      this.productos = this.sessionService.currentProducts;
    }
  }

  public showList() {
    this.modoLista = true;
  }

  public showGrid() {
    this.modoLista = false;
  }

  public addToCart(producto: Producto) {
    this.carritoCompraService.agregarProducto(producto, 1)
      .then(res => {
        this.mensajeProducto = 'El producto fue agregado al carrito';
        this.mensajeProductoRef = producto.id;
        this.mensajeProductotipo = 'info';
      })
      .catch(error => {
        this.mensajeProducto = error;
        this.mensajeProductoRef = producto.id;
        this.mensajeProductotipo = 'error';
      });
  }
}
