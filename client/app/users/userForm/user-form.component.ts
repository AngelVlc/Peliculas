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
    error: string = '';
    success: boolean = false;
    confirmDeleteTitle: string = '¿Está seguro?';
    confirmDeleteText: string = 'Si';
    confirmCancelText: string = 'No';

    constructor(private route: ActivatedRoute
        , private router: Router
        , private userService: UserService) { }

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
            .subscribe((data: User) => this.user = data);
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