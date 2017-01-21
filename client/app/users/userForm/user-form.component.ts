import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
    templateUrl: './app/users/userForm/user-form.component.html'
})

export class UserFormComponent implements OnInit {
    user: User;
    error = '';

    constructor(private route: ActivatedRoute
        , private router: Router
        , private userService: UserService) { }

    ngOnInit() {
        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.userService.getUserById(+params['id']))
            .subscribe((data: User) => this.user = data);
        
    }

    onSubmit() {
    }

}