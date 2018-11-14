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

export function get_Config(configService: ConfigService) {
  return () => configService.getConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    ListadoProductosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER, useFactory: get_Config, deps: [ConfigService], multi: true },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
