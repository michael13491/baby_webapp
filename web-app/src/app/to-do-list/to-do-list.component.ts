import { Component, OnInit } from '@angular/core';
import {TodoDataService} from '../services/todo-data.service';
import {Todo} from '../todo';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit{

  public newTodo = '';
  public todos: Todo[];

  constructor(private todoDataService: TodoDataService) {
  }

  async ngOnInit(): Promise<void> {
    this.todos = await this.todoDataService.getAllTodosFromDatabase();
  }

  async addTodo() {
    const todo: Todo = new Todo({title: this.newTodo});
    await this.todoDataService.addTodo(todo);

    this.updateTodos();

    this.newTodo = '';

  }

  async toggleTodoComplete(todo) {
    await this.todoDataService.toggleTodoComplete(todo);
    this.updateTodos();
  }

  async removeTodo(todo) {
    await this.todoDataService.deleteTodoByKey(todo.key);

    this.updateTodos();
  }

  updateTodos() {
    this.todos = this.todoDataService.getAllTodos();
  }

  incompleteTodos(): number {
    return this.todos.filter( todo => todo.complete === false).length;
  }
}
