import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";


const TOKEN_HEADER = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private auth:AuthService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        //add the token from localstorage to every req
        let authReq = req;
         const token = this.auth.getToken();
          if(token!=null){
              console.log("inside ceptor"+token);
             authReq = authReq.clone({setHeaders:{Authorization:`Bearer ${token}`}});
          }
          return next.handle(authReq);

    }
    
}

export const AuthInterceptorProvider = [
    {
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi: true
}
]