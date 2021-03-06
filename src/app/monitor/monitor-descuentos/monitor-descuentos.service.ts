import { Injectable } from '@angular/core';
import { BonitaVentaModelService } from 'src/app/bonita/bdm/bonita-venta-model.service';
import { ItemDescuentoVenta } from './monitor-descuentos.model';

@Injectable({
  providedIn: 'root'
})
export class MonitorDescuentosService {

  constructor(
    private bonitaVentaModelService: BonitaVentaModelService
  ) { }

  public obtenerDecuentosVentas(page: number): Promise<ItemDescuentoVenta[]> {
    return new Promise<ItemDescuentoVenta[]>((resolve, reject) => {
      this.bonitaVentaModelService.obtenerDescuentosVenta(page).then(
        respVentas => {
          const result = [];
          respVentas.forEach(ventaModel => {
            result.push(new ItemDescuentoVenta(ventaModel));
          });
          resolve(result);
      })
      .catch(error => { reject(error); });
    });
  }

  public obtenerCantidadDescuentosVenta(): Promise<number> {
    return this.bonitaVentaModelService.obtenerCantidadDescuentosVenta();
  }
}
