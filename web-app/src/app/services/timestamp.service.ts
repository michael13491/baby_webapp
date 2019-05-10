import {Injectable} from '@angular/core';
import {MessageService} from './message.service';
import {HttpClient} from '@angular/common/http';
import {DataStorageType, FirebaseDataStorage} from "./firebase-data-storage";

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': 'my-auth-token'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class TimestampService {

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private fbdata: FirebaseDataStorage) { }


  /* actitivty can be feeding|poop|bath|sleep*/
  getDates(activity_type: string) {
    return this.fbdata.getTimeStampData(DataStorageType.timeTracker, activity_type);
  }

  setDate(activity_type: string, data) {
    return this.fbdata.setTimeStampData(DataStorageType.timeTracker, activity_type, data);
  }


}
