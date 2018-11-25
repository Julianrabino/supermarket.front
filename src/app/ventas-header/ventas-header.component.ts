import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Producto } from '../productos/producto.model';
import { CarritoCompra } from '../carrito-compra/carrito-compra.model';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ResumenVentaComponent } from '../resumen-venta/resumen-venta.component';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-ventas-header',
  templateUrl: './ventas-header.component.html',
  styleUrls: ['./ventas-header.component.css']
})
export class VentasHeaderComponent implements OnInit {

  get cantNavigate(): boolean { return this.sessionService.currentVenta != null; }

  constructor(
    private sessionService: SessionService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  public logOut() {
    this.loginService.logOut();
  }
}
