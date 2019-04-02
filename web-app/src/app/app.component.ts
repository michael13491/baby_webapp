import {Component, OnInit} from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit(): void {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyBE9hZ4GyJVCdxtM_U_smIi9bzYiYO6Qpo",
      authDomain: "home-webapp.firebaseapp.com",
      // databaseURL: "https://home-webapp.firebaseio.com",
      // projectId: "home-webapp",
      // storageBucket: "home-webapp.appspot.com",
      // messagingSenderId: "668969581500"
    };
    firebase.initializeApp(config);
  }
}
