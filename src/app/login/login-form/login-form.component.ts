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

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.model = new LoginUser();
    this.loginService.GetCurrentUser().then(user => {
      this.usuarioLogueado = user;
    });
  }

  onSubmit() {
    this.errorLogin = null;
    this.loginService.logIn(this.model).then(
      res => {
        this.usuarioLogueado = res;
        this.router.navigate(['productos']);
      },
      msg => this.errorLogin = msg);
  }

  logout() {
    this.loginService.logOut().then(res => {
      if (res) {
        this.usuarioLogueado = null;
      }
    }).catch(ex => { this.usuarioLogueado = null; });
  }
}
