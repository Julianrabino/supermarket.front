import { Component, OnInit } from '@angular/core';

import { Usuario } from '../usuario';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  submitted = false;

  model: Usuario = { nombre : 'juliancesar', password : '123', nombrePila : 'Julián', apellido : 'Rabino', numeroDocumento : 30912073 };

  constructor() { }

  ngOnInit() {
  }

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  // get diagnostic() { return JSON.stringify(this.model); }
}
