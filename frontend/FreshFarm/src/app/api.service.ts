import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable,throwError} from 'rxjs';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api/v1/auth'; // Base URL of your API

  constructor(private http: HttpClient) {}

  // Example: GET request
  authenticate(data: User): Observable<any> {
    return this.http.post(this.baseUrl+"/authenticate",data).pipe(
      catchError(this.handleError));
  }

  register(data: User): Observable<any> {
    return this.http.post(this.baseUrl+"/register",data).pipe(
      catchError(this.handleError));
  }


  private handleError(err: any): Observable<any> {
    console.error('an error occurred!', err.error.msg)
    return throwError(()=>err.error)
  }

  logout(): Observable<any> {
    return this.http.get(this.baseUrl+"/logout").pipe(
      catchError((err) => {
        console.error('Error during logout:', err);
        return throwError(() => err);
      })
    );
  }

}