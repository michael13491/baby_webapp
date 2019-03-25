import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
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

@NgModule({
  declarations: [
    AppComponent,
    TimestampButtonComponent,
    MessagesComponent,
    NavbarComponent,
    ToDoListComponent,
    GroceryListComponent,
    TimeTrackerComponent
  ],
  imports: [
    // enabling tracing option for debugging routes
    // RouterModule.forRoot(appRoutes, { enableTracing: true}),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FirebaseDataStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
