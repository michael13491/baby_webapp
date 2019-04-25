import {Injectable} from '@angular/core';
import {CheckListItem} from '../CheckListItem';
import {DataStorageType, FirebaseDataStorage} from './firebase-data-storage';

@Injectable({
  providedIn: 'root'
})
export class ChecklistDataService {

  lastId = 0;
  checkList: CheckListItem[] = [];

  constructor(private firebaseData: FirebaseDataStorage) { }

  async addItem(item: CheckListItem, type: DataStorageType) {
    if (!item.id) {
      item.id = ++this.lastId;
    }

    // database returns {name: "key"}
    const resultKeyObject = await this.firebaseData.addData(type, item);

    if (resultKeyObject) {
      item.key = resultKeyObject['name'];
      this.checkList.unshift(item);
    }

    return item;
  }

  async deleteItemByKey(key: string, type: DataStorageType) {
    await this.firebaseData.deleteData(type, key);
    const index = this.checkList.findIndex(checkListItem => checkListItem.key === key);
    this.checkList.splice(index, 1);
  }


  getCheckList() {
    return this.checkList;
  }

  async getCheckListTypeFromDatabase(type: DataStorageType) {
    const response = await this.firebaseData.getData(type);
    if (response) {
      const keys = Object.keys(response);
      this.checkList = Object.values(response);

      for (let i = 0; i < this.checkList.length; i++) {
        this.checkList[i].key = keys[i];
      }
      this.checkList.reverse();
    }

    return this.checkList;
  }

  // Toggle item complete
  async toggleItemComplete(item: CheckListItem, type: DataStorageType) {
    await this.firebaseData.patchData(type, item.key, {complete: !item.complete});
    const index = this.checkList.findIndex(checkListItem => checkListItem.key === item.key);
    this.checkList[index].complete = !this.checkList[index].complete;
  }

}
