import { Injectable } from '@angular/core';
import { TEST_TIME } from './test-dates';
import { Observable, of } from 'rxjs';
import { timestamp } from './timestamp';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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

  private serverUrl = 'http://192.168.20.100:3000/';
  // private postServerUrl = 'http://192.168.20.19:3000/';

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add('timestamp service: ' + message);
  }

  /* actitivty can be feeding|poop|bath|sleep*/
  getDates(activity_type: string): Observable<string[]> {
    return this.http.get<string[]>(this.serverUrl + activity_type)
               .pipe(
                 catchError(this.handleError('getDates', []))
               );
  }

  setDate(activity_type: string): Observable<string> {
    return this.http.post<string>(this.serverUrl + activity_type, null)
               .pipe(
                 catchError(this.handleError<string>('setDate'))
           );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
