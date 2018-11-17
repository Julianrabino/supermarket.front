import { Injectable } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Producto } from '../productos/producto.model';
import { CompraProducto, CarritoCompra } from './carrito-compra.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoCompraService {

  constructor(
    private sessionService: SessionService
  ) { }

  public agregarProducto(producto: Producto, cantidad: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const carrito = this.sessionService.currentCart;
      if (!carrito) {
        reject('No existe un carrito activo');
      } else {
        const compraProductoIndex = carrito.Productos.findIndex(p => p.Producto.id === producto.id);
        let compraProducto;
        if (compraProductoIndex === -1) {
          compraProducto = new CompraProducto();
        } else {
          compraProducto = carrito.Productos[compraProductoIndex];
        }

        if ((cantidad + compraProducto.Cantidad) > producto.stock) {
          // valida stock
          reject(`No hay stock suficiente para efectuar la compra (stock total disponible: ${producto.stock})`);
        } else {
          compraProducto.Producto = producto;
          compraProducto.Cantidad += cantidad;
          if (compraProductoIndex === -1) {
            carrito.Productos.push(compraProducto);
          } else {
            carrito.Productos[compraProductoIndex] = compraProducto;
          }
          this.sessionService.currentCart = carrito;
          resolve('Se agregó el producto correctamente');
        }
      }
    });
  }

  public eliminarProducto(producto: Producto,  cantidad: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const carrito = this.sessionService.currentCart;
      if (!carrito) {
        reject('No existe un carrito activo');
      } else {
        const compraProductoIndex = carrito.Productos.findIndex(p => p.Producto.id === producto.id);
        if (compraProductoIndex === -1) {
          reject('No exite el producto en el carrito');
        } else {
          const compraProducto = carrito.Productos[compraProductoIndex];
          if ((compraProducto.Cantidad - cantidad) <= 0) {
            carrito.Productos.splice(compraProductoIndex, 1);
          } else {
            compraProducto.Cantidad -= cantidad;
          }
          this.sessionService.currentCart = carrito;
          resolve('Se eliminó el producto correctamente');
        }
      }
    });
  }

  public nuevoCarrito(): CarritoCompra {
    return new CarritoCompra();
  }
}
