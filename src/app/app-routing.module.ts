import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { ListadoProductosComponent } from './productos/listado-productos/listado-productos.component';
import { AuthGuard } from './guards/auth.guard';
import { CarritoCompraComponent } from './carrito-compra/carrito-compra.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'productos', component: ListadoProductosComponent, canActivate: [AuthGuard] },
  { path: 'carrito', component: CarritoCompraComponent, canActivate: [AuthGuard] },
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
