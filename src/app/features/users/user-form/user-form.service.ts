import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from '../user.model';
import { AuthService } from '../../../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

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

  getUserById(id: number) {
    return this.http.get(this.usersUrl + '/' + id, { headers: this.headers })
      .map((res: Response) => res.json());
  }

  createUser(user: User) {
    return this.http.post(this.usersUrl, user, { headers: this.headers })
      .map((res: Response) => res.json());
  }

  updateUser(user: User) {
    return this.http.put(this.usersUrl + '/' + user.id, user, { headers: this.headers })
      .map((res: Response) => res.json());
  }
}
