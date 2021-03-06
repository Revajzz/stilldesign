import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private auth: AuthService) {
    this.isLoggedIn = this.auth.isAuthenticated();
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

}
