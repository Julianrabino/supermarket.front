import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { ConfigService } from './config/config.service';
import { ListadoProductosComponent } from './productos/listado-productos/listado-productos.component';
import { CookieService } from 'ngx-cookie-service';
import { VentasLayoutComponent } from './ventas-layout/ventas-layout.component';
import { VentasHeaderComponent } from './ventas-header/ventas-header.component';
import { FooterComponent } from './footer/footer.component';
import { CarritoCompraComponent } from './carrito-compra/carrito-compra.component';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { ResumenVentaComponent } from './resumen-venta/resumen-venta.component';
import { ErrorComponent } from './error/error.component';
import { MonitorLayoutComponent } from './monitor/monitor-layout/monitor-layout.component';
import { MonitorHeaderComponent } from './monitor/monitor-header/monitor-header.component';
import { MonitorFooterComponent } from './monitor/monitor-footer/monitor-footer.component';
import { MonitorDescuentosComponent } from './monitor/monitor-descuentos/monitor-descuentos.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonitorCuponesComponent } from './monitor/monitor-cupones/monitor-cupones.component';

export function get_Config(configService: ConfigService) {
  return () => configService.getConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    ListadoProductosComponent,
    VentasLayoutComponent,
    VentasHeaderComponent,
    FooterComponent,
    CarritoCompraComponent,
    ResumenVentaComponent,
    ErrorComponent,
    MonitorLayoutComponent,
    MonitorHeaderComponent,
    MonitorFooterComponent,
    MonitorDescuentosComponent,
    MonitorCuponesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ModalDialogModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER, useFactory: get_Config, deps: [ConfigService], multi: true },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
