import { Component } from '@angular/core';
import {AuthenticationService} from './_services/authentication.service';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html'
})
export class AppComponent {
  constructor(private authService: AuthenticationService) { }

}
