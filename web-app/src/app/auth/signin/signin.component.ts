import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public hidePassword = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  getErrorMessage(key: FormControl) {
    return key.hasError('required') ? 'Must enter a value' :
      key.hasError('email') ? 'Not a valid email' :
        '';
  }

  onSignIn() {
    const email = this.email.value;
    const password = this.password.value;
    console.log(email, password);
    this.authService.signinUser(email, password);
  }

  onCancel() {
    this.signinForm.setValue({
      email: '',
      password: ''
    });
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }
}
