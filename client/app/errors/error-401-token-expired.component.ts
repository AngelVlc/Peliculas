import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
    template: `
        <div class="container">
            <h3>El token ha caducado.</h3>

            <div class="panel-body">
                <a [routerLink]="['/login']">Iniciar sesión</a>
            </div>
        </div>
  `
})
export class Error401TokenExpiredComponent implements OnInit {
    constructor(
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout()
    }
}
