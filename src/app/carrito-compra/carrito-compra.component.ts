import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SessionService } from '../session/session.service';
import { CompraProducto, CarritoCompra } from './carrito-compra.model';
import { MensajeUi } from '../shared/mensaje-ui.model';
import { CarritoCompraService } from './carrito-compra.service';
import { SimpleModalComponent, ModalDialogService } from 'ngx-modal-dialog';
import { Router } from '@angular/router';

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
    private carritoCompraService: CarritoCompraService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef,
    private router: Router
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
    if (compraProducto.Cantidad > 1) {
      this.carritoCompraService.eliminarProducto(compraProducto.Producto, 1)
      .then(resp => {
        this.productos = this.sessionService.currentCart.Productos;
      })
      .catch(error => {
        this.mensajeUi = new MensajeUi(error, compraProducto.Producto.id, 'error');
      });
    } else {
      this.eliminarProducto(compraProducto);
    }
  }

  public eliminarProducto(compraProducto: CompraProducto) {
    this.modalService.openDialog(this.viewRef, {
      title: 'Confirmación',
      childComponent: SimpleModalComponent,
      data: {
        text: '¿Está seguro que desea eliminar el producto del carrito?'
      },
      settings: {
        closeButtonClass: 'close theme-icon-close'
      },
      actionButtons: [
        {
          text: 'Si!',
          buttonClass: 'btn btn-success',
          onAction: () => new Promise((resolve: any) => {
            this.borrarProducto(compraProducto);
            resolve();
          })
        },
        {
          text: 'No',
          buttonClass: 'btn btn-danger'
        }
      ]
    });
  }

  public borrarProducto(compraProducto) {
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

  public asociarCupon(numeroCupon: number, productoSeleccionado: number) {
    if (numeroCupon === 0 || isNaN(numeroCupon)) {
      this.modalError('Número de cupón incorrecto');
    } else if (productoSeleccionado === -1) {
      this.modalError('Debe indicar un producto');
    } else {
      this.carritoCompraService.asociarCupon(numeroCupon, productoSeleccionado)
        .then(() => {
          this.productos = this.sessionService.currentCart.Productos;
        })
        .catch(error => { this.modalError(error); });
    }
  }

  public desasociarCupon(numeroCupon: number) {
    this.carritoCompraService.desasociarCupon(numeroCupon)
      .then(() => this.productos = this.sessionService.currentCart.Productos)
      .catch(error => { this.modalError(error); });
  }

  private modalError(mensaje: string) {
    this.modalService.openDialog(this.viewRef, {
      title: 'Error',
      childComponent: SimpleModalComponent,
      data: {
        text: mensaje
      },
      settings: {
        closeButtonClass: 'close theme-icon-close'
      },
      actionButtons: [
        {
          text: 'De acuerdo',
          buttonClass: 'btn btn-danger'
        }
      ]
    });
  }

  public confirmarCompra() {
    this.modalService.openDialog(this.viewRef, {
      title: 'Confirmación',
      childComponent: SimpleModalComponent,
      data: {
        text: '¿Está seguro que desea confirmar la compra?'
      },
      settings: {
        closeButtonClass: 'close theme-icon-close'
      },
      actionButtons: [
        {
          text: 'Si!',
          buttonClass: 'btn btn-success',
          onAction: () => new Promise((resolve: any) => {
            this.efectuarCompra();
            resolve();
          })
        },
        {
          text: 'No',
          buttonClass: 'btn btn-danger'
        }
      ]
    });
  }

  private efectuarCompra() {
    this.carritoCompraService.efectuarCompra().then(
      ventaId => {
        this.sessionService.currentVenta = ventaId;
        this.router.navigate(['/resumenVenta']);
      });
  }
}
