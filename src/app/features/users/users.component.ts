import { Component, OnInit } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  selected: User;
  newUser: User;

  constructor() { }

  ngOnInit() {
  }

  select(user: User): void {
    this.selected = user;
  }

  createdUser(user: User): void {
    this.newUser = user;
    console.warn(this.newUser);
  }

}
