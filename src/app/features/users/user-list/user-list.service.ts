import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { User } from '../user.model';
import { AuthService } from '../../../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private usersUrl = 'http://api.demo.iss.stilldesign.work/admin/user';

  private accessToken;
  private headers;

  constructor(private http: Http, private auth: AuthService) {
    this.accessToken = this.auth.getAccessToken();

    this.headers = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken,
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl, {
      headers: this.headers
    }).map((res: Response) => res.json());
  }

  deleteUser(id: number) {
    return this.http.delete(this.usersUrl + '/' + id, {
      headers: this.headers
    }).map((res: Response) => res.json());
  }
}
