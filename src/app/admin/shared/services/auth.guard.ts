import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServices } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthServices,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if (this.auth.isAuthenticated()) {
            return true;
        } else {
            this.auth.logout();
            this.router.navigate(['/admin', 'login'], {
                queryParams: {
                    loginAgain: true
                }
            });
        }
    }
}