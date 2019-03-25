import {Injectable} from '@angular/core';
import {Todo} from '../todo';
import {DataStorageType, FirebaseDataStorage} from './firebase-data-storage';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  lastId = 0;
  todos: Todo[];

  constructor(private firebaseData: FirebaseDataStorage) { }

  async addTodo(todo: Todo) {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }

    // database returns {name: "key"}
    const resultKeyObject = await this.firebaseData.addData(DataStorageType.toDoList, todo);

    if (resultKeyObject) {
      todo.key = resultKeyObject['name'];
      this.todos.unshift(todo);
    }

    return todo;
  }

  async deleteTodoByKey(key: string) {
    await this.firebaseData.deleteData(DataStorageType.toDoList, key);
    const index = this.todos.findIndex(todo => todo.key === key);
    this.todos.splice(index, 1);
  }


  getAllTodos() {
    return this.todos;
  }

  async getAllTodosFromDatabase() {
    const response = await this.firebaseData.getData(DataStorageType.toDoList);
    const keys = Object.keys(response);
    this.todos = Object.values(response);

    for (let i = 0; i < this.todos.length; i++) {
      this.todos[i].key = keys[i];
    }
    this.todos.reverse();

    return this.todos;
  }

  // Toggle todo complete
  async toggleTodoComplete(todo: Todo) {
    const result = await this.firebaseData.patchData(DataStorageType.toDoList, todo.key, {complete: !todo.complete});
    console.log(result);
    const index = this.todos.findIndex(todoItem => todoItem.key === todo.key);
    this.todos[index].complete = !this.todos[index].complete;
    console.log(this.todos);
  }

}
