import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private oauthUrl = 'http://api.demo.iss.stilldesign.work/oauth/token';

  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(private http: Http, private router: Router) { }

  getAccessToken() {
    const storage = JSON.parse(localStorage.getItem('accessToken'));

    if (storage !== null) {
      const body = JSON.parse(storage._body);

      return body.access_token;
    }

    this.router.navigate(['auth/login']);
  }

  public isAuthenticated(): boolean {
    return this.getAccessToken() != null;
  }

  login(username: string, password: string) {

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const postData = {
      grant_type: 'password',
      client_id: 2,
      client_secret: 'Admin_Production',
      username: username,
      password: password,
      scope: ''
    };

    return this.http.post(this.oauthUrl, JSON.stringify(postData), {
      headers: headers
    })
      .map(user => {
        if (user) {
          localStorage.setItem('accessToken', JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['auth/login']);
  }
}
