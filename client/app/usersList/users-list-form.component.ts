import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';


@Component({  
  templateUrl: './app/usersList/users-list-form.component.html'
})

export class UsersListFormComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  getUsers(): void {
    this.userService.getUsers()
      .then(users => {        
        this.users = users;
        alert("users list " + JSON.stringify(this.users));
      });
  }

  ngOnInit(): void {
    this.getUsers();
  }
}