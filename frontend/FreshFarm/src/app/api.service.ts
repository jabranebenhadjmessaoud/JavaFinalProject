import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from './user';
import { Product } from './product';
import { Post } from './post';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api/v1'; // Base URL of your API

  constructor(private http: HttpClient) { }

  // Example: GET request
  authenticate(data: User): Observable<any> {
    return this.http.post(this.baseUrl + "/auth/authenticate", data).pipe(
      catchError(this.handleError));
  }

  register(data: User): Observable<any> {
    return this.http.post(this.baseUrl + "/auth/register", data).pipe(
      catchError(this.handleError));
  }

  createproduct(data: Product): Observable<any> {
    return this.http.post(this.baseUrl + "/farmer/newproduct", data).pipe(
      catchError(this.handleError));
  }

  getallproducts(): Observable<any> {
    return this.http.get(this.baseUrl + "/farmer/allproducts").pipe(
      catchError(this.handleError));
  }


  private handleError(err: any): Observable<any> {
    console.error('an error occurred!', err.error.msg)
    return throwError(() => err.error)
  }
  getallusers(): Observable<any> {
    return this.http.get(this.baseUrl + "/admin/allusers").pipe(
      catchError(this.handleError));
  }

  getallposts(): Observable<any> {
    return this.http.get(this.baseUrl + "/farmer/posts/allposts").pipe(
      catchError(this.handleError));
  }

  createpost(data: Post): Observable<any> {
    return this.http.post(this.baseUrl + "/farmer/posts/newpost", data).pipe(
      catchError(this.handleError));
  }

  //fetch post details
  showpostdetails(id: number): Observable<any> {
    return this.http.get(this.baseUrl + `/farmer/posts/showpost/${id}`).pipe(
      catchError(this.handleError));
  }


  //get user by id
  getuserbyid(id: number): Observable<any> {
    return this.http.get(this.baseUrl + `/user/showprofile/${id}`).pipe(
      catchError(this.handleError));
  }
}