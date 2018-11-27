import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto.model';
import { SessionService } from 'src/app/session/session.service';
import { ProductosService } from '../productos.service';
import { CarritoCompraService } from 'src/app/carrito-compra/carrito-compra.service';
import { MensajeUi } from 'src/app/shared/mensaje-ui.model';
import { ErrorService } from 'src/app/error/error.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { animacionStaggerFadeIn } from 'src/app/animations/animacion-stagger-fade-in';
import { animacionVerticalExpand } from 'src/app/animations/animacion-vertical-expand';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css'],
  animations: [ animacionStaggerFadeIn, animacionVerticalExpand ]
})
export class ListadoProductosComponent implements OnInit {

  productos: Producto[];
  mensajeUi: MensajeUi;
  modoLista: boolean;

  constructor(
    private sessionService: SessionService,
    private productosService: ProductosService,
    private carritoCompraService: CarritoCompraService,
    private errorService: ErrorService
    ) { }

  ngOnInit() {
    if (!this.sessionService.currentCase) {
      this.carritoCompraService.IniciarCompra()
        .then(actividad => {
            this.productosService.getProductos().then(
              res => { this.productos = res; });
        })
        .catch(error => {
          this.errorService.handle(error);
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
        this.mensajeUi = new MensajeUi('El producto fue agregado al carrito', producto.id, 'info');
      })
      .catch(error => {
        this.mensajeUi = new MensajeUi(error, producto.id, 'error');
      }).finally(() => { setTimeout(() => { this.mensajeUi = null; }, 3000); });
  }
}
