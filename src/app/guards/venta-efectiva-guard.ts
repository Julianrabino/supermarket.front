import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../session/session.service';

@Injectable({
    providedIn: 'root'
})
export class VentaEfectivaGuard implements CanActivate {

    constructor(
        private router: Router,
        private sessionService: SessionService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.sessionService.currentVenta) {
            // logged in so return true
            return true;
        }

        // Si no hay venta se redirecciona a los productos
        this.router.navigate(['/productos']);
        return false;
    }
}
