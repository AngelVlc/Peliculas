import { Component } from '@angular/core';
import {AuthenticationService} from './_services/authentication.service';

@Component({
  selector: 'my-app',
  template: `
    <div class="jumbotron">
        <div class="container">
            <div class="col-sm-8 col-sm-offset-2">       
                <nav *ngIf="this.authService.isUserLoged()">
                  <a [routerLink]="['/']" routerLinkActive="active">Inicio</a>
                  <a *ngIf="this.authService.isUserLogedAdmin()" [routerLink]="['/usersList']" routerLinkActive="active">Usuarios</a>
                  <a [routerLink]="['/login']">Cerrar sesión</a>
                </nav>     
                <router-outlet></router-outlet>
            </div>
        </div>
    </div>
  `
})
export class AppComponent {
  constructor(private authService: AuthenticationService) { }

    isUserLoged() {
      return this.authService.isUserLoged();
    }

    isUserLogedAdmin() {
      return this.authService.isUserLogedAdmin();
    }
}
