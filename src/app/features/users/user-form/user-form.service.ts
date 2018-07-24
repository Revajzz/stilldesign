import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

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

    return this.http.post(this.oauthUrl, JSON.stringify(postData), { headers: headers })
      .map((res: Response) => res.json());
  }

  getUserById(accessToken: string, id: number) {

    const headers = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    });

    return this.http.get(this.usersUrl + '/' + id, { headers: headers })
      .map((res: Response) => res.json());
  }

  createUser(accessToken: string, user: User) {

    const headers = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    });

    return this.http.post(this.usersUrl, user, { headers: headers })
      .map((res: Response) => res.json());
  }

  updateUser(accessToken: string, user: User) {

    const headers = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    });

    return this.http.put(this.usersUrl + '/' + user.id, user, { headers: headers })
      .map((res: Response) => res.json());
  }
}
