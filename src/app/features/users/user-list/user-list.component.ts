import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from '../user.model';
import { UserListService } from './user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserListService]
})
export class UserListComponent implements OnInit {

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  // @Input() set user(value: User) {
  //   this.users.push(value);
  // }

  users: User[];
  public loading = false;

  constructor(private userListService: UserListService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.loading = true;
    this.users = [];

    this.userListService.getAccessToken()
      .subscribe(data => {
        this.getUsers(data.access_token);
      });
  }

  getUsers(accessToken: string) {
    this.userListService.getUsers(accessToken)
      .subscribe(
        users => {
          this.users = users.data;
          this.loading = false;
        });
  }

  editUser(user: User) {
    this.select.emit(user);
  }

  deleteUser(id) {
    this.userListService.getAccessToken()
      .subscribe(data => {
        this.userListService.deleteUser(data.access_token, id).subscribe(u => {
          this.refresh();
        });
      });

    this.refresh();
  }
}
