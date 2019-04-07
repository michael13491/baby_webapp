import {ToDoListComponent} from './to-do-list/to-do-list.component';
import {GroceryListComponent} from './grocery-list/grocery-list.component';
import {Routes} from '@angular/router';
import {TimeTrackerComponent} from './time-tracker/time-tracker.component';
import {SigninComponent} from './auth/signin/signin.component';
import {AuthGuard} from './services/auth-guard.service';

export const appRoutes: Routes = [
  { path: 'todolist', component: ToDoListComponent, canActivate: [AuthGuard] },
  { path: 'grocery', component: GroceryListComponent, canActivate: [AuthGuard] },
  { path: 'home', component: TimeTrackerComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent},
  { path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  { path: '**', component: SigninComponent }
];
