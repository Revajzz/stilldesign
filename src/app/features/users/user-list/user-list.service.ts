import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private oauthUrl = 'http://api.demo.iss.stilldesign.work/oauth/token';
  private usersUrl = 'http://api.demo.iss.stilldesign.work/admin/user';

  constructor(private http: Http) { }

  getAccessToken() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const postData = {
      grant_type: 'password',
      client_id: 2,
      client_secret: 'Admin_Production',
      username: 'dev@stilldesign.hu',
      password: 'StillPass',
      scope: ''
    };

    return this.http.post(this.oauthUrl, JSON.stringify(postData), {
      headers: headers
    })
      .map((res: Response) => res.json());
  }

  getUsers(accessToken: string): Observable<User[]> {

    const headers = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    });

    return this.http.get(this.usersUrl, {
      headers: headers
    }).map((res: Response) => res.json());
  }

  deleteUser(accessToken: string, id: number) {

    const headers = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    });

    return this.http.delete(this.usersUrl + '/' + id, {
      headers: headers
    }).map((res: Response) => res.json());
  }
}
