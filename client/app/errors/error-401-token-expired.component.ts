import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  template: `
  <h4>Error 401: La sesión ha caducado</h4>
  <a [routerLink]="['/login']">Iniciar sesión</a>
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
