import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { CompraProducto, CarritoCompra } from './carrito-compra.model';
import { MensajeUi } from '../shared/mensaje-ui.model';
import { CarritoCompraService } from './carrito-compra.service';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.css']
})
export class CarritoCompraComponent implements OnInit {

  productos: CompraProducto[];
  mensajeUi: MensajeUi;

  constructor(
    private sessionService: SessionService,
    private carritoCompraService: CarritoCompraService
  ) { }

  ngOnInit() {
    this.productos = this.sessionService.currentCart.Productos;
  }

  public incrementarProducto(compraProducto: CompraProducto) {
    this.carritoCompraService.agregarProducto(compraProducto.Producto, 1)
      .then(resp => {
        this.productos = this.sessionService.currentCart.Productos;
      })
      .catch(error => {
        this.mensajeUi = new MensajeUi(error, compraProducto.Producto.id, 'error');
      });
  }

  public decrementarProducto(compraProducto: CompraProducto) {
    this.carritoCompraService.eliminarProducto(compraProducto.Producto, 1)
      .then(resp => {
        this.productos = this.sessionService.currentCart.Productos;
      })
      .catch(error => {
        this.mensajeUi = new MensajeUi(error, compraProducto.Producto.id, 'error');
      });
  }

  public eliminarProducto(compraProducto) {
    this.carritoCompraService.eliminarProducto(compraProducto.Producto, compraProducto.Cantidad)
      .then(resp => {
        this.productos = this.sessionService.currentCart.Productos;
      })
      .catch(error => {
        this.mensajeUi = new MensajeUi(error, compraProducto.Producto.id, 'error');
      });
  }

  public ObtenerTotal(): number {
    let result = 0;
    this.productos.forEach(compraProducto => {
      result += compraProducto.Cantidad * compraProducto.Producto.precioVenta;
    });
    return result;
  }
}
