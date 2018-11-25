import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session/session.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private loginService: LoginService
  ) { }

  public handle(error: any) {
    const msg = error.mensaje ? error.mensaje : 'Ha ocurrido un error inesperado';
    this.sessionService.currentError = msg;
    this.loginService.logOut(false);
    this.router.navigate(['/error']);
  }
}
