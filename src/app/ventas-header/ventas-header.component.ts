import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from '../session/session.service';
import { LoginService } from '../login/login.service';
import { CarritoCompraService } from '../carrito-compra/carrito-compra.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ventas-header',
  templateUrl: './ventas-header.component.html',
  styleUrls: ['./ventas-header.component.css']
})
export class VentasHeaderComponent implements OnInit, OnDestroy {

  get cantNavigate(): boolean { return this.sessionService.currentVenta != null; }
  cantidadProductos: number;
  private subcantidadProductos: Subscription;

  constructor(
    private sessionService: SessionService,
    private loginService: LoginService,
    private carritoCompraService: CarritoCompraService
  ) { }

  ngOnInit() {
    this.subcantidadProductos = this.carritoCompraService.cantidadProductos.subscribe((cantidad) => {
      this.cantidadProductos = cantidad;
    });
  }

  ngOnDestroy() {
    this.subcantidadProductos.unsubscribe();
  }

  public logOut() {
    this.loginService.logOut();
  }
}
