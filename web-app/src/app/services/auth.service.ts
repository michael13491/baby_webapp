import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  token: string;

  constructor(private router: Router) {}

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          console.log(response);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
          this.router.navigate(['todolist']);
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  getTokenId() {
    firebase.auth().currentUser.getIdToken()
      .then( token => this.token = token);

    return this.token;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
