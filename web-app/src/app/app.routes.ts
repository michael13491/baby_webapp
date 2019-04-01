import {ToDoListComponent} from './to-do-list/to-do-list.component';
import {GroceryListComponent} from './grocery-list/grocery-list.component';
import {Routes} from '@angular/router';
import {TimeTrackerComponent} from './time-tracker/time-tracker.component';
import {SigninComponent} from './auth/signin/signin.component';

export const appRoutes: Routes = [
  { path: 'todolist', component: ToDoListComponent },
  { path: 'grocery', component: GroceryListComponent },
  { path: 'home', component: TimeTrackerComponent },
  { path: 'signin', component: SigninComponent},
  { path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  { path: '**', component: SigninComponent }
];
