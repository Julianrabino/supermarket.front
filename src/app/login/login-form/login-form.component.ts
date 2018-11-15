import { Component, OnInit } from '@angular/core';

import { Usuario } from '../usuario.model';
import { LoginService } from '../login.service';
import { LoginUser } from '../login-user.model';
import { Router } from '@angular/router';
import { BonitaService } from 'src/app/bonita/bonita.service';
import { SessionService } from 'src/app/storage/session.service';
import { ConfigService } from 'src/app/config/config.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  title = 'Supermercado Online';
  usuarioLogueado: Usuario = null;
  model: LoginUser;
  errorLogin: string = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private bonitaService: BonitaService,
    private sessionService: SessionService,
    private configService: ConfigService) { }

  ngOnInit() {
    this.model = new LoginUser();
    this.loginService.GetCurrentUser().then(user => {
      this.usuarioLogueado = user;
    });
  }

  onSubmit() {
    this.errorLogin = null;
    this.loginService.LogIn(this.model).then(
      res => {
        this.usuarioLogueado = res;
        if (!this.usuarioLogueado) {
          this.errorLogin = 'Credenciales inválidas';
        } else {
          this.bonitaService.LogIn().then(
            token => {
              this.sessionService.set(this.configService.Config.sessionKeys.currentBonitaApiToken, token);
              this.router.navigate(['productos']);
            });
        }
      },
      msg => console.log(msg));
  }

  logout() {
    this.loginService.LogOut().then(res => {
      if (res) {
        this.usuarioLogueado = null;
      }
    });
  }

  // TODO: Remove this when we're done
  // get diagnostic() { return JSON.stringify(this.model); }
}
