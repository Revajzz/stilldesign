import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpRequest } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private oauthUrl = 'http://api.iss.stilldesign.work/oauth/token';

  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(private http: Http) {}

  // public getAccessToken(): string {
  //   return localStorage.getItem('accessToken');
  // }

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
      .map((res: Response) => console.log(res.json()));
  }

  public isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();

    return accessToken != null;
  }

  login(username: string, password: string) {
    return this.http.post('/api/authenticate', { username: username, password: password })
      .map(user => {
          if (user) {
              localStorage.setItem('accessToken', JSON.stringify(user));
          }

          return user;
      });
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}
