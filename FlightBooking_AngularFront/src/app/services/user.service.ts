import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  // public addUser(user:any){
  //    return this.http.post(`${baseUrl}/user/createUser`,user);
  // }

  addUser(user: object): Observable<Object>{
    console.log("URL : "+ baseUrl);
    return this.http.post(`${baseUrl}/user`, user);
  }

  getUser(userId: number): Observable<any>{
    return this.http.get(`${baseUrl}/user/${userId}`);
  }

  getUserList(): Observable<any>{
    return this.http.get(`${baseUrl}/user/readAllUsers`)
  }

  updateUser(user: object): Observable<Object>{
    return this.http.put(`${baseUrl}/user/updateUser/`, user);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete(`${baseUrl}/user/${id}`,{ responseType: 'text'});
  }
}
