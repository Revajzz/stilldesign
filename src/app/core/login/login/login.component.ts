import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      name:     ['', Validators.required, Validators.minLength(4), ],
      password: ['', Validators.required, Validators.minLength(4), ],
      email:    ['', Validators.required, Validators.minLength(4), ],
    });
  }
}
