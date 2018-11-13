import { Component, OnInit } from '@angular/core';

import { Usuario } from '../usuario.model';
import { LoginService } from '../login.service';
import { LoginUser } from '../login-user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  usuarioLogueado: Usuario = null; 
  model: LoginUser;
  errorLogin: string = null;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.model = new LoginUser();
  }

  onSubmit() {
    this.errorLogin = null;
    this.loginService.LogIn(this.model).then(
      res => {
        this.usuarioLogueado = res;
        if (!this.usuarioLogueado) {
          this.errorLogin = 'Credenciales inválidas';
        }
      },
      msg => console.log(msg));
  }

  logout() {
    this.usuarioLogueado = null;
  }

  // TODO: Remove this when we're done
  // get diagnostic() { return JSON.stringify(this.model); }
}
