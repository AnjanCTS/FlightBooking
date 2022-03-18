import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import baseUrl from './helper';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  login(login:any): Observable<any> {
    return this.http.post(`${baseUrl}/api/auth/signin`, login, httpOptions);
  }

  //login user: set token in localStorage
  public loginUser(token: string){
     localStorage.setItem("token",token);
     return true;
  }

  public setSearchFlightDet(loginForm : any){
    localStorage.setItem("user_data",loginForm);
  }

  //isLogin: user is logged in or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr==undefined || tokenStr=='' || tokenStr == null){
      return false;
    }
    return true;
  }

  //Logout : remove token from LocalStorage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }
  //getToken: get token from localstorage
  public getToken(){
    return localStorage.getItem("token");
  }

  //set Userdetails
  public setUser(user:any){
localStorage.setItem('user',JSON.stringify(user));
  }

   //getToken: get user from localstorage
   public getUser(){
    let userStr =  localStorage.getItem("user");
    if(userStr){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //getUserRole: to get role of user
  public getUserRole(){
    let user = this.getUser();
    return user.roles;
  }

}

