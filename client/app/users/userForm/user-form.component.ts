import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsHelper } from '../../_helpers/forms.helper'

import 'rxjs/add/operator/switchMap';


@Component({
    templateUrl: './app/users/userForm/user-form.component.html'
})

export class UserFormComponent implements OnInit {
    title: string;
    user: User;
    error: string = '';
    success: boolean = false;

    constructor(private route: ActivatedRoute
        , private router: Router
        , private userService: UserService
        , private formsHelper: FormsHelper) { }

    ngOnInit() {
        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => {
                var userId = +params['id'];
                if (userId > 0) {                    
                    return this.userService.getUserById(userId);
                } else {                    
                    return Observable.of(new User()).map(o => new User());
                }
            })
            .subscribe((data: User) => {
                this.user = data;
                if (this.user.userId) {
                    this.title = 'Usuario ' + this.user.userName;
                } else {
                    this.title = 'Nuevo usuario';
                }
            });
    }

    onSubmit() {
        if (this.user.userId) {
            this.userService.updateUser(this.user)
                .subscribe((data: boolean) => {
                    this.success = true;
                });
        } else {
            this.userService.insertUser(this.user)
                .subscribe((data: boolean) => {
                    this.router.navigate(['/usersList']);
                });
        }
    }

    deleteUser() {
        this.userService.deleteUser(this.user)
            .subscribe((data: boolean) => {
                this.router.navigate(['/usersList']);
            });
    }
}