import { Component, OnInit } from '@angular/core';
import { Venta } from './resumen-venta.model';
import { ResumenVentaService } from './resumen-venta.service';
import { SessionService } from '../session/session.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-resumen-venta',
  templateUrl: './resumen-venta.component.html',
  styleUrls: ['./resumen-venta.component.css']
})
export class ResumenVentaComponent implements OnInit {

  venta: Venta;

  constructor(
    private resumenVentaService: ResumenVentaService,
    private sessionService: SessionService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.resumenVentaService.obtenerVenta(this.sessionService.currentVenta)
      .then(res => this.venta = res);
  }

  public salir() {
    this.loginService.logOut();
  }
}
