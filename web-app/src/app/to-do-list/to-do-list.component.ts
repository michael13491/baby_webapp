import {Component, OnInit} from '@angular/core';
import {ChecklistDataService} from '../services/checklist-data.service';
import {CheckListItem} from '../CheckListItem';
import {DataStorageType} from '../services/firebase-data-storage';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

  public newTodo = '';
  public todos: CheckListItem[];

  constructor(private checklistDataService: ChecklistDataService) {
  }

  async ngOnInit(): Promise<void> {
    this.todos = await this.checklistDataService.getCheckListTypeFromDatabase(DataStorageType.toDoList);
  }

  async addTodo() {
    const todo: CheckListItem = new CheckListItem({title: this.newTodo});
    await this.checklistDataService.addItem(todo, DataStorageType.toDoList);

    this.updateTodos();

    this.newTodo = '';

  }

  async toggleTodoComplete(todo) {
    await this.checklistDataService.toggleItemComplete(todo, DataStorageType.toDoList);
    this.updateTodos();
  }

  async removeTodo(todo) {
    await this.checklistDataService.deleteItemByKey(todo.key, DataStorageType.toDoList);

    this.updateTodos();
  }

  updateTodos() {
    this.todos = this.checklistDataService.getCheckList();
  }

  incompleteTodos(): number {
    return this.todos.filter( todo => todo.complete === false).length;
  }
}
