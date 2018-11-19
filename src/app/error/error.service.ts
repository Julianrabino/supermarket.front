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
    this.sessionService.currentError = error.mensaje;
    this.loginService.logOut(false);
    this.router.navigate(['/error']);
  }
}
