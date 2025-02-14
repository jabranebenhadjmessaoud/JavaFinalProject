import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from './user';
import { Product } from './product';
import { Post } from './post';
import { Comment } from './comment';
import { Report } from './report';
import { Order } from './order';


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

  getOneProduct(id: number): Observable<any> {
    return this.http.get(this.baseUrl + `/farmer/showproduct/${id}`).pipe(
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

  getallcomments(): Observable<any> {
    return this.http.get(this.baseUrl + "/farmer/posts/allcomments").pipe(
      catchError(this.handleError));
  }

  getOnePostComments(id: number): Observable<any> {
    return this.http.get(this.baseUrl + `/farmer/posts/comments/${id}`).pipe(
      catchError(this.handleError));
  }


  createComment(data: Comment, post_id: number): Observable<any> {
    return this.http.post(this.baseUrl + `/farmer/posts/newcomment/${post_id}`, data).pipe(
      catchError(this.handleError));
  }


  //fetch reports  
  getAllReports(): Observable<any> {
    return this.http.get(this.baseUrl + `/client/products/allreports`).pipe(
      catchError(this.handleError));
  }

  //create report
  createReport(data: Report, product_id: number): Observable<any> {
    return this.http.post(this.baseUrl + `/client/products/newreport/${product_id}`, data).pipe(
      catchError(this.handleError));
  }

  //fetch poduct details
  showProductDetails(id: number): Observable<any> {
    return this.http.get(this.baseUrl + `/farmer/showproduct/${id}`).pipe(
      catchError(this.handleError));
  }

  //ban farmer
  banFarmer(id: number): Observable<any> {
    return this.http.get(this.baseUrl + `/admin/ban/${id}`).pipe(
      catchError(this.handleError));
  }

  //unban farmer
  unbanFarmer(id: number): Observable<any> {
    return this.http.get(this.baseUrl + `/admin/unban/${id}`).pipe(
      catchError(this.handleError));
  }


  // create new Order

  createOrder(data: Order): Observable<any> {
    return this.http.post(this.baseUrl + "/orders/neworder", data).pipe(
      catchError(this.handleError));
  }

  //get all orders
  getAllOrders(): Observable<any> {
    return this.http.get(this.baseUrl + `/orders/all`).pipe(
      catchError(this.handleError));
  }

  //order set to delivering 
  setOrderToDelivering(id: number): Observable<any> {
    return this.http.get(this.baseUrl + `/orders/order/settodelivering/${id}`).pipe(
      catchError(this.handleError));
  }
  //order set to delivred
  setOrderToDelivered(id: number): Observable<any> {
    return this.http.get(this.baseUrl + `/orders/order/settodelivered/${id}`).pipe(
      catchError(this.handleError));
  }

}