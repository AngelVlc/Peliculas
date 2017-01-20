import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  templateUrl: './app/usersList/users-list-form.component.html'
})

export class UsersListFormComponent implements OnInit {
  users: User[];

  constructor(private router: Router,
    private userService: UserService) { }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(data => { this.users = data; }
      , error => {        
        switch (error.status) {
          case 401:
            if (error._body.indexOf('jwt expired') > 0) {
              this.router.navigate(['/error401TokenExpired']);
            }
            else {
              this.router.navigate(['/error401']);
            }
            break;

          default:
            this.router.navigate(['/genericError']);
        }


      });
  }

  ngOnInit(): void {
    this.getUsers();
  }
}