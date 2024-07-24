import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserInputService {
  private apiUrl='https://localhost:7162/api/UserInputs';

  constructor(private http: HttpClient) { }

  getUserInputs():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl)
       .pipe(
        catchError(this.handleError<any[]>('getUserInputs',[]))
       );
  }

  addUserInput(inputNumber: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { inputNumber }, httpOptions)
      .pipe(
        catchError(this.handleError<any>('addUserInput'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
