import { Component } from '@angular/core';
import {AuthenticationService} from './_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html'
})
export class AppComponent {
  constructor(private authService: AuthenticationService
            , private router: Router ) { }
}
