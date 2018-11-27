import { Injectable } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Producto } from '../productos/producto.model';
import { CompraProducto, CarritoCompra } from './carrito-compra.model';
import { BonitaCaseService } from '../bonita/case/bonita-case.service';
import { BonitaHumanTaskService } from '../bonita/human-task/bonita-human-task.service';
import { ConfigService } from '../config/config.service';
import { BonitaActivity } from '../bonita/bonita-shared.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoCompraService {

  constructor(
    private sessionService: SessionService,
    private bonitaCaseService: BonitaCaseService,
    private bonitaHumanTaskService: BonitaHumanTaskService,
    private configService: ConfigService
  ) { }

  public cantidadProductos = new BehaviorSubject<number>(this.obtenerCantidadArticulos(this.sessionService.currentCart));

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
          this.cantidadProductos.next(this.obtenerCantidadArticulos(carrito));
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
          reject('No existe el producto en el carrito');
        } else {
          const compraProducto = carrito.Productos[compraProductoIndex];
          if ((compraProducto.Cantidad - cantidad) <= 0) {
            carrito.Productos.splice(compraProductoIndex, 1);
          } else {
            compraProducto.Cantidad -= cantidad;
            if (compraProducto.Cantidad < compraProducto.Cupones.length) {
              compraProducto.Cupones.pop();
            }
          }
          this.sessionService.currentCart = carrito;
          this.cantidadProductos.next(this.obtenerCantidadArticulos(carrito));
          resolve('Se eliminó el producto correctamente');
        }
      }
    });
  }

  public asociarCupon(numeroCupon: number, productId: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const carrito = this.sessionService.currentCart;
      if (!carrito) {
        reject('No existe un carrito activo');
      } else {
        const compraProductoIndex = carrito.Productos.findIndex(p => p.Producto.id === productId);
        if (compraProductoIndex === -1) {
          reject('No existe el producto en el carrito');
        } else {
          const compraProducto = carrito.Productos[compraProductoIndex];
          if (compraProducto.Cupones.length < compraProducto.Cantidad) {
            const cuponIndex = carrito.Productos.findIndex(p => p.Cupones.includes(numeroCupon));
            if (cuponIndex === -1) {
              compraProducto.Cupones.push(numeroCupon);
            } else {
              reject('Un cupón solo puede ser utilizado una vez');
            }
          } else {
            reject('Solo se puede usar un copón por producto comprado');
          }
          this.sessionService.currentCart = carrito;
          resolve('Cupón agreado correctamente');
        }
      }
    });
  }

  public desasociarCupon(numeroCupon: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const carrito = this.sessionService.currentCart;
      if (!carrito) {
        reject('No existe un carrito activo');
      } else {
        const compraProductoIndex = carrito.Productos.findIndex(p => p.Cupones.includes(numeroCupon));
        if (compraProductoIndex === -1) {
          reject('No existe el cupón');
        } else {
          const cuponIndex = carrito.Productos[compraProductoIndex].Cupones.findIndex(c => c === numeroCupon);
          carrito.Productos[compraProductoIndex].Cupones.splice(cuponIndex, 1);
          this.sessionService.currentCart = carrito;
          resolve('Cupón eliminado correctamente');
        }
      }
    });
  }

  public async efectuarCompra(): Promise<string> {
    // return new Promise<string>((resolve, reject) => {
      let result;
      let taskId;
      const carrito = this.sessionService.currentCart;
      if (!carrito) {
        result =  'No existe un carrito activo';
      } else {
        const caseId = this.sessionService.currentCase.id;
        for (let productoIndex = 0; productoIndex < carrito.Productos.length; productoIndex++) {
          const compraProducto = carrito.Productos[productoIndex];

          // ProductId
          await this.bonitaCaseService.setCaseVariable(
            caseId, this.configService.Config.bonita.variables.productIdCompra,
            compraProducto.Producto.id, 'java.lang.Long');
          for (let i = 0; i < compraProducto.Cantidad; i++) {

            // NroCupon
            await this.bonitaCaseService.setCaseVariable(
              caseId, this.configService.Config.bonita.variables.cuponCompra,
              (i < compraProducto.Cupones.length) ? compraProducto.Cupones[i] : 0,
              'java.lang.Long');

            // Espera poder iniciar la compra (en la primera ya debería estar ready)
            await this.bonitaHumanTaskService.whaitFor(caseId, this.configService.Config.bonita.tasks.iniciarCompra)
              .then(actitivy =>  taskId = actitivy.id);
            // Inicia la compra
            await this.bonitaHumanTaskService.complete(taskId);

            // Espera poder finalizar la compra
            await this.bonitaHumanTaskService.whaitFor(caseId, this.configService.Config.bonita.tasks.finalizarCompra)
              .then(actitivy =>  taskId = actitivy.id);
            // Finaliza la compra
            await this.bonitaHumanTaskService.complete(taskId);

            // Espera poder inciar la nueva compra (antes de setear los nuevos valores de las variables)
            await this.bonitaHumanTaskService.whaitFor(caseId, this.configService.Config.bonita.tasks.iniciarCompra)
              .then(actitivy =>  taskId = actitivy.id);
          }
        }

        await this.bonitaCaseService.getCaseVariable(caseId, this.configService.Config.bonita.variables.ventaId)
          .then(resp => {
            result = resp.value;
            this.sessionService.currentVenta = result;
          });

        // Se finaliza toda la venta
        await this.bonitaCaseService.setCaseVariable(
            caseId, this.configService.Config.bonita.variables.finCompra,
            true, 'java.lang.Boolean');
        await this.bonitaHumanTaskService.complete(taskId);
        this.sessionService.currentCase = null;
        this.sessionService.currentCart = null;
        this.sessionService.currentProducts = null;
        this.cantidadProductos.next(0);
      }
      return result;
  }

  public IniciarCompra(): Promise<BonitaActivity> {
    this.sessionService.currentProducts = null;
    this.sessionService.currentVenta = null;
    this.sessionService.currentCart = new CarritoCompra();
    this.cantidadProductos.next(this.obtenerCantidadArticulos(this.sessionService.currentCart));
    return new Promise<BonitaActivity>((resolve, reject) => {
      this.bonitaCaseService.start().then(bonitaCase => {
        this.bonitaHumanTaskService.whaitFor(bonitaCase.rootCaseId,
          this.configService.Config.bonita.tasks.iniciarCompra)
          .then(
            actividad => {
              resolve(actividad);
            },
            error => { reject(error); }
          );
      });
    });
  }

  public puedeUsarCupones(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.bonitaCaseService.getCaseVariable(
        this.sessionService.currentCase.id,
        this.configService.Config.bonita.variables.esEmpleado).then(
          variable => { resolve(!JSON.parse(variable.value)); });
    });
  }

  public obtenerCantidadArticulos(carritoCompra: CarritoCompra) {
    let result = 0;
    if (carritoCompra) {
      carritoCompra.Productos.forEach(producto => {
        result += producto.Cantidad;
      });
    }
    return result;
  }
}
