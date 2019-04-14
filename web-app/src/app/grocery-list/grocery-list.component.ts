import {Component, OnInit} from '@angular/core';
import {DataStorageType} from '../services/firebase-data-storage';
import {Todo} from '../todo';
import {TodoDataService} from '../services/todo-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {
  newGrocery: string;
  quantity = 1;
  unit = 'px';

  groceryList: Todo[] = [];
  constructor(private todoDataService: TodoDataService, private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.groceryList = await this.todoDataService.getAllTodosFromDatabase(DataStorageType.groceryList);
  }

  async addGrocery() {
    if (!this.newGrocery) {
      return;
    }

    const title = `${this.newGrocery} ${this.quantity} ${this.unit}`;
    const newItem: Todo = new Todo({title});
    await this.todoDataService.addTodo(newItem, DataStorageType.groceryList);

    this.updateGroceries();

    this.newGrocery = '';
  }

  async toggleGroceryComplete(todo) {
    await this.todoDataService.toggleTodoComplete(todo, DataStorageType.groceryList);
    this.updateGroceries();
  }

  async removeGrocery(todo) {
    await this.todoDataService.deleteTodoByKey(todo.key, DataStorageType.groceryList);

    this.updateGroceries();
  }

  updateGroceries() {
    this.groceryList = this.todoDataService.getAllTodos();
  }

  incompleteGroceries(): number {
    return this.groceryList.filter( todo => todo.complete === false).length;
  }

}
