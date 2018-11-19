import { Injectable } from '@angular/core';
import { Usuario } from '../login/usuario.model';
import { ConfigService } from '../config/config.service';
import { BonitaCase } from '../bonita/case/bonita-case.model';
import { BonitaActivity } from '../bonita/bonita-shared.model';
import { Producto } from '../productos/producto.model';
import { CarritoCompra } from '../carrito-compra/carrito-compra.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private configService: ConfigService) { }

  public set(key: string, value: any): any {
    if (value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      sessionStorage.setItem(key, null);
    }

    return value;
  }

  public get(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // USER
  get currentUser(): Usuario {
    return this.get(this.configService.Config.sessionKeys.currentUser);
  }

  set currentUser(user: Usuario) {
    this.set(this.configService.Config.sessionKeys.currentUser, user);
  }

  // BonitaToken
  get currentBonitaApiToken(): string {
    return this.get(this.configService.Config.sessionKeys.currentBonitaApiToken);
  }

  set currentBonitaApiToken(token: string)  {
    this.set(this.configService.Config.sessionKeys.currentBonitaApiToken, token);
  }

  // Activity
  // get currentActivity(): BonitaActivity {
  //   return this.get(this.configService.Config.sessionKeys.currentTaskId);
  // }

  // set currentActivity(activity: BonitaActivity) {
  //   this.set(this.configService.Config.sessionKeys.currentTaskId, activity);
  // }

  // Case
  get currentCase(): BonitaCase {
    return this.get(this.configService.Config.sessionKeys.currentCase);
  }

  set currentCase(caso: BonitaCase) {
    this.set(this.configService.Config.sessionKeys.currentCase, caso);
  }

  // Products
  get currentProducts(): Producto[] {
    return this.get(this.configService.Config.sessionKeys.currentProducts);
  }

  set currentProducts(products: Producto[]) {
    this.set(this.configService.Config.sessionKeys.currentProducts, products);
  }

  // CarritoCompra
  get currentCart(): CarritoCompra {
    return this.get(this.configService.Config.sessionKeys.currentCart);
  }

  set currentCart(cart: CarritoCompra) {
    this.set(this.configService.Config.sessionKeys.currentCart, cart);
  }

  // Venta
  get currentVenta(): string {
    return this.get(this.configService.Config.sessionKeys.currentVenta);
  }

  set currentVenta(ventaId: string) {
    this.set(this.configService.Config.sessionKeys.currentVenta, ventaId);
  }

  public clean(): void {
    // this.currentActivity = null;
    this.currentBonitaApiToken = null;
    this.currentCase = null;
    this.currentUser = null;
    this.currentProducts = null;
    this.currentCart = null;
    this.currentVenta = null;
  }
}
