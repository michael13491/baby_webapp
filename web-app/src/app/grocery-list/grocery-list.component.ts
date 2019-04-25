import {Component, OnInit} from '@angular/core';
import {DataStorageType} from '../services/firebase-data-storage';
import {CheckListItem} from '../CheckListItem';
import {ChecklistDataService} from '../services/checklist-data.service';
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

  groceryList: CheckListItem[] = [];
  constructor(private checklistDataService: ChecklistDataService, private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.groceryList = await this.checklistDataService.getCheckListTypeFromDatabase(DataStorageType.groceryList);
  }

  async addGrocery() {
    if (!this.newGrocery) {
      return;
    }

    const title = `${this.newGrocery} ${this.quantity} ${this.unit}`;
    const newItem: CheckListItem = new CheckListItem({title});
    await this.checklistDataService.addItem(newItem, DataStorageType.groceryList);

    this.updateGroceries();

    this.newGrocery = '';
  }

  async toggleGroceryComplete(todo) {
    await this.checklistDataService.toggleItemComplete(todo, DataStorageType.groceryList);
    this.updateGroceries();
  }

  async removeGrocery(todo) {
    await this.checklistDataService.deleteItemByKey(todo.key, DataStorageType.groceryList);

    this.updateGroceries();
  }

  updateGroceries() {
    this.groceryList = this.checklistDataService.getCheckList();
  }

  incompleteGroceries(): number {
    return this.groceryList.filter( todo => todo.complete === false).length;
  }

}
