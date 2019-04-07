import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  token: string;

  constructor(private router: Router) {}

  async signinUser(email: string, password: string) {
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      await firebase.auth().signInWithEmailAndPassword(email, password);
      const token = await firebase.auth().currentUser.getIdToken();
      this.token = token;
      this.router.navigate(['todolist']);
    } catch (e) {
      console.log('sign in auth error', e);
    }
  }

  async getTokenId(): Promise<string> {
    if (firebase.auth().currentUser) {
      this.token = await firebase.auth().currentUser.getIdToken();
    }
    return this.token;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  isAuthenticated() {
    return this.token != null;
  }

  async setToken(user: firebase.User) {
    if (!user) {
      return;
    }

    const token = await user.getIdToken();

    if (token) {
      this.token = token;
    }
  }
}
