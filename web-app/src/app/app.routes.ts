import {ToDoListComponent} from "./to-do-list/to-do-list.component";
import {GroceryListComponent} from "./grocery-list/grocery-list.component";
import {Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {TimeTrackerComponent} from "./time-tracker/time-tracker.component";

export const appRoutes: Routes = [
  { path: 'todolist', component: ToDoListComponent },
  { path: 'grocery', component: GroceryListComponent },
  { path: 'home', component: TimeTrackerComponent,
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: TimeTrackerComponent }
];
