import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate() {
        if (this.authService.isUserLogedAdmin()) {
            // logged in so return true
            return true;
        }       

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}