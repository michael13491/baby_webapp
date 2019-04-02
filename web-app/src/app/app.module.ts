import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TimestampButtonComponent } from './timestamp-button/timestamp-button.component';
import { MessagesComponent } from './messages/messages.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import {appRoutes} from './app.routes';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';
import {FormsModule} from '@angular/forms';
import {FirebaseDataStorage} from './services/firebase-data-storage';
import { SigninComponent } from './auth/signin/signin.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuard} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    TimestampButtonComponent,
    MessagesComponent,
    NavbarComponent,
    ToDoListComponent,
    GroceryListComponent,
    TimeTrackerComponent,
    SigninComponent
  ],
  imports: [
    // enabling tracing option for debugging routes
    // RouterModule.forRoot(appRoutes, { enableTracing: true}),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [FirebaseDataStorage, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
