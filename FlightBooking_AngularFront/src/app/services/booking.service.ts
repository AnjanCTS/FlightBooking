import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scheduleflight } from '../Models/scheduleFlight.component';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }

  bookFlight(book: any,userName: string,flightNumber: number): Observable<Object>{
    let params = new HttpParams()
    .set('userName', userName)
    .set('flightNumber', flightNumber)

    console.log(book);
    console.log(params);
    return this.http.post(`${baseUrl}/book/add?`, book,{params});
  }

  getFlight(airportId: number): Observable<any>{
    return this.http.get(`${baseUrl}/book/viewAirport/${airportId}`);
  }

  searchFlight(searchFlight : any): Observable<any>{
    let params = new HttpParams()
    .set('srcAirport', String(searchFlight.srcAirport))
    .set('dstnAirport', String(searchFlight.dstnAirport))
    .set('deptDateTime', String(searchFlight.deptDateTime))
    return this.http.get(`${baseUrl}/book/search/?`,{params})
  }

  getTicketByPNR(PNR: any): Observable<any>{
    return this.http.get(`${baseUrl}/book/pnr/${PNR}`);
  }

  getTicketByMail(mail: any): Observable<any>{
    return this.http.get(`${baseUrl}/book/mail/${mail}`);
  }

  getFlightList(): Observable<any>{
    return this.http.get(`${baseUrl}/book`)
  }

  updateFlight(book : any): Observable<Object>{
    console.log(book);
    let form=new FormData();
    form.append("NoOfPassenger", String(book.passenger))
    form.append("alternateMail",String(book.mail))
    return this.http.put(`${baseUrl}/book/`, form);
  }

  deleteTicket(id: number): Observable<any>{
    return this.http.delete(`${baseUrl}/book/${id}`);
  }

}
