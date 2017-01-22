import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './app/users/usersList/users-list-form.component.html'
})

export class UsersListFormComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe((data: User[]) => { this.users = data; });
  }

  ngOnInit(): void {
    this.getUsers();
  }
}