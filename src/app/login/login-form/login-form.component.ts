import { Component, OnInit } from '@angular/core';

import { Usuario } from '../usuario.model';
import { LoginService } from '../login.service';
import { LoginUser } from '../login-user.model';
import { Router } from '@angular/router';

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
  perfilAdministrador: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.model = new LoginUser();
    this.loginService.GetCurrentUser().then(user => {
      this.usuarioLogueado = user;
      this.perfilAdministrador = this.loginService.perfilAdministrador(this.usuarioLogueado);
    });
  }

  onSubmit() {
    this.errorLogin = null;
    this.loginService.logIn(this.model).then(
      res => {
        this.usuarioLogueado = res;
        this.perfilAdministrador = this.loginService.perfilAdministrador(this.usuarioLogueado);
        if (this.perfilAdministrador) {
          this.router.navigate(['monitorDescuentos']);
        } else {
          this.router.navigate(['productos']);
        }
      },
      msg => this.errorLogin = msg);
  }

  logout() {
    this.usuarioLogueado = null;
    this.perfilAdministrador = false;
    this.loginService.logOut();
    // this.loginService.logOut().then(res => {
    //   if (res) {
    //     this.usuarioLogueado = null;
    //   }
    // }).catch(ex => { this.usuarioLogueado = null; });
  }
}
