import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../user.model';
import { UserFormService } from './user-form.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public isCollapsed = false;
  public userForm: FormGroup;
  public currentUser: User;
  public jumpTypeNew = false;
  public loading = false;

  @Output() createdUser: EventEmitter<any> = new EventEmitter<any>();

  private _userId;

  @Input() set user(value: User) {
    this._userId = value;
    this.loading = false;

    if (this._userId) {
      this.userFormService.getAccessToken()
        .subscribe(data => {
          this.userFormService.getUserById(data.access_token, this._userId)
            .subscribe(u => this.currentUser = u.data);
          this.loading = false;
        });
    } else {
      this.currentUser = {};
    }

    this.createForm(this.currentUser);
  }

  get userId(): string {
    return this._userId;
  }

  constructor(private fb: FormBuilder, private userFormService: UserFormService) {
  }

  ngOnInit() {
  }

  createForm(user: User) {
    this.userForm = this.fb.group({
      id: [user.id, []],
      firstName: [user.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [user.lastName, [Validators.required, Validators.minLength(3)]],
      email: [user.email, [Validators.required, Validators.minLength(5)]],
      active: [user.active, []],
      phone: [user.phone, []],
      locale: [user.locale, []],
    });
  }

  onSubmit() {
    this.loading = true;

    if (this.jumpTypeNew) {
      this.userFormService.getAccessToken()
        .subscribe(data => {
          this.userFormService.createUser(data.access_token, this.userForm.value)
            .subscribe(res => {
              this.loading = false;
              this.createdUser.emit(this.userForm.value);

              this.currentUser = {};
              this.createForm(this.currentUser);
            });
        });

    } else {
      this.userFormService.getAccessToken()
        .subscribe(data => {
          this.userFormService.updateUser(data.access_token, this.userForm.value)
            .subscribe(res => {
              this.loading = false;

              this.currentUser = {};
              this.createForm(this.currentUser);
            });
        });
    }
  }

  switchJumpType() {
    this.jumpTypeNew = !this.jumpTypeNew;

    this.currentUser = {};
    this.createForm(this.currentUser);
  }
}
