import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  templateUrl: './app/login/login-form.component.html'
})

export class LoginFormComponent {
 model: any = {};
    loading = false
    error = ''

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout()
    }

    onSubmit() {        
        this.loading = true;        
        this.authenticationService.login(this.model.name, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'Usuario no válido';
                    this.loading = false;
                }
            });
    }
}