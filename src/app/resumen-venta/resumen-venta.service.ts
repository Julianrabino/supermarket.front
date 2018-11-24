import { Injectable } from '@angular/core';
import { Venta, ItemVenta } from './resumen-venta.model';
import { BonitaVentaModelService } from '../bonita/bdm/bonita-venta-model.service';

@Injectable({
  providedIn: 'root'
})
export class ResumenVentaService {

  constructor(
    private bonitaVentaModelService: BonitaVentaModelService
  ) { }

  public obtenerVenta(ventaId: string): Promise<Venta> {
    return new Promise<Venta>((resolve, reject) => {
      this.bonitaVentaModelService.obtenerPorVentaId(ventaId).then(
        respVentas => {
          const result = new Venta();
          result.VentaId = ventaId;
          respVentas.forEach(ventaModel => {
            const itemVenta = new ItemVenta();
            itemVenta.Cantidad = 1;
            itemVenta.NroCupon = ventaModel.nroCupon !== 0 ? ventaModel.nroCupon : null;
            itemVenta.CuponValido = itemVenta.NroCupon ? ventaModel.cuponValido : null;
            itemVenta.PrecioVentaAplicado = ventaModel.precioVentaAplicado;
            itemVenta.PrecioVentaOriginal = ventaModel.precioVentaOriginal;
            itemVenta.ProductId = ventaModel.productId;
            itemVenta.ProductName = ventaModel.productName;
            itemVenta.VentaExitosa = ventaModel.ventaExitosa;
            itemVenta.PorcentajeDescuentoCupon = ventaModel.porcentajeDescuentoCupon;
            result.agregarVenta(itemVenta);
          });
          resolve(result);
      });
    });
  }
}
