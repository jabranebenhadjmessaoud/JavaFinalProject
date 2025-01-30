import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable,throwError} from 'rxjs';
import { User } from './user';
import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api/v1'; // Base URL of your API

  constructor(private http: HttpClient) {}

  // Example: GET request
  authenticate(data: User): Observable<any> {
    return this.http.post(this.baseUrl+"/auth/authenticate",data).pipe(
      catchError(this.handleError));
  }

  register(data: User): Observable<any> {
    return this.http.post(this.baseUrl+"/auth/register",data).pipe(
      catchError(this.handleError));
  }
  createproduct(data:Product):Observable<any>{
    return this.http.post(this.baseUrl+"/farmer/newproduct",data).pipe(
      catchError(this.handleError));
  }


  private handleError(err: any): Observable<any> {
    console.error('an error occurred!', err.error.msg)
    return throwError(()=>err.error)
  }
  getallusers():Observable<any>{
    return this.http.get(this.baseUrl+"/allusers").pipe(
      catchError(this.handleError));
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