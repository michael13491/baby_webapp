import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

export enum DataStorageType {
  toDoList = 'todolist',
  groceryList = 'groceryList',
  timeTracker = 'timeTracker'

}
@Injectable()
export class FirebaseDataStorage {
  constructor(private http: HttpClient, private authService: AuthService) {}

  serverUrl = 'https://home-webapp.firebaseio.com/';

  addData(dataType: DataStorageType, data: any) {
    const token = this.authService.token;

    return this.http.post(this.serverUrl + dataType + '.json?auth=' + token, data).toPromise();
  }

  getData(dataType: DataStorageType) {
    const token = this.authService.token;

    return this.http.get(this.serverUrl + dataType + '.json?auth=' + token).toPromise();
  }

  deleteData(dataType: DataStorageType, key: string) {
    const token = this.authService.token;

    return this.http.delete(`${this.serverUrl}${dataType}/${key}.json?auth=${token}`).toPromise();
  }

  patchData(dataType: DataStorageType, key: string, newData) {
    const token = this.authService.token;
    return this.http.patch(`${this.serverUrl}${dataType}/${key}.json?auth=${token}`, newData).toPromise();
  }

}
