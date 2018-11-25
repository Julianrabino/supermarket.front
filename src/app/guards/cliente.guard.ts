import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from '../session/session.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteGuard implements CanActivate {
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private loginService: LoginService
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.sessionService.currentUser && this.loginService.perfilCliente(this.sessionService.currentUser)) {
        // logged in so return true
        return true;
    }

    // no hay usuario logueado, redirecciona al login
    this.router.navigate(['/login']);
    return false;
  }
}
