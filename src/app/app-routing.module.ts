import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { ListadoProductosComponent } from './productos/listado-productos/listado-productos.component';
import { AuthGuard } from './guards/auth.guard';
import { CarritoCompraComponent } from './carrito-compra/carrito-compra.component';
import { ResumenVentaComponent } from './resumen-venta/resumen-venta.component';
import { VentaEfectivaGuard } from './guards/venta-efectiva-guard';
import { ErrorComponent } from './error/error.component';
import { AdminGuard } from './guards/admin.guard';
import { MonitorDescuentosComponent } from './monitor/monitor-descuentos/monitor-descuentos.component';
import { ClienteGuard } from './guards/cliente.guard';
import { MonitorCuponesComponent } from './monitor/monitor-cupones/monitor-cupones.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'productos', component: ListadoProductosComponent, canActivate: [AuthGuard, ClienteGuard] },
  { path: 'carrito', component: CarritoCompraComponent, canActivate: [AuthGuard, ClienteGuard] },
  { path: 'resumenVenta', component: ResumenVentaComponent, canActivate: [AuthGuard, ClienteGuard, VentaEfectivaGuard] },
  { path: 'monitorDescuentos', component: MonitorDescuentosComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'monitorCupones', component: MonitorCuponesComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
