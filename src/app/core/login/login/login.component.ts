import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {

    this.auth.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .subscribe(res => {

        if (res.status === 401) {
          alert('Invalid credentials!');
        } else {
          this.router.navigate(['users']);
        }
      });
  }

  createForm() {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
