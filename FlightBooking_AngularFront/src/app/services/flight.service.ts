import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable} from 'rxjs';
import { Scheduleflight } from '../Models/scheduleFlight.component';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http:HttpClient) { }

  addFlight(flight: Scheduleflight): Observable<Object>{
    let form=new FormData();
    form.append("flightNumber", String(flight.flightNumber))
    form.append("Airline",String(flight.Airline))
    form.append("deptDateTime",String(flight.deptDateTime))
    form.append("availableSeats",String(flight.availableSeats));
    form.append("ticketCost",String(flight.ticketCost));
    let params = new HttpParams()
    .set('srcAirport', String(flight.srcAirport))
    .set('dstnAirport', String(flight.dstnAirport))
    console.log(flight);
    console.log(params.toString());

    return this.http.post(`${baseUrl}/flight/?`, form,{params});
  }

  getFlight(airportId: number): Observable<any>{
    return this.http.get(`${baseUrl}/flight/viewAirport/${airportId}`);
  }

  searchFlight(searchFlight : any): Observable<any>{
    let params = new HttpParams()
    .set('srcAirport', String(searchFlight.srcAirport))
    .set('dstnAirport', String(searchFlight.dstnAirport))
    .set('deptDateTime', String(searchFlight.deptDateTime))
    return this.http.get(`${baseUrl}/flight/search/?`,{params})
  }

  getFlightList(): Observable<any>{
    return this.http.get(`${baseUrl}/flight`)
  }

  updateFlight(flight: Scheduleflight): Observable<Object>{
    console.log(flight);
    let form=new FormData();
    form.append("flightNumber", String(flight.flightNumber))
    form.append("Airline",String(flight.Airline))
    form.append("deptDateTime",String(flight.deptDateTime))
    form.append("availableSeats",String(flight.availableSeats));
    form.append("ticketCost",String(flight.ticketCost));
    form.append("srcAirport",String(flight.srcAirport));
    form.append("dstnAirport",String(flight.dstnAirport));
    form.append("enabled",String(flight.enabled?false:true));
    return this.http.put(`${baseUrl}/flight/`, form);
  }

  deleteFlight(id: number): Observable<any>{
    return this.http.delete(`${baseUrl}/flight/${id}`,{ responseType: 'text'});
  }

}
