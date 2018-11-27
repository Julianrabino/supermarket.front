import { Injectable } from '@angular/core';
import { BonitaVentaModelService } from 'src/app/bonita/bdm/bonita-venta-model.service';
import { ItemCuponVenta } from './monitor-cupones.model';

@Injectable({
  providedIn: 'root'
})
export class MonitorCuponesService {

  constructor(
    private bonitaVentaModelService: BonitaVentaModelService
  ) { }

  public obtenerCuponesVentas(page: number): Promise<ItemCuponVenta[]> {
    return new Promise<ItemCuponVenta[]>((resolve, reject) => {
      this.bonitaVentaModelService.obtenerCuponesVenta(page).then(
        respVentas => {
          const result = [];
          respVentas.forEach(ventaModel => {
            result.push(new ItemCuponVenta(ventaModel));
          });
          resolve(result);
      })
      .catch(error => { reject(error); });
    });
  }

  public obtenerCantidadCuponesVenta(): Promise<number> {
    return this.bonitaVentaModelService.obtenerCantidadCuponesVenta();
  }
}
