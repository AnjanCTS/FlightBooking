import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private http:HttpClient) { }

  addAirport(airport: object): Observable<Object>{
    return this.http.post(`${baseUrl}/airport/add`, airport);
  }

  getAirport(airportId: number): Observable<any>{
    return this.http.get(`${baseUrl}/airport/viewAirport/${airportId}`);
  }

  getAirportList(): Observable<any>{
    return this.http.get(`${baseUrl}/airport`)
  }

  updateAirport(airport: object): Observable<Object>{
    return this.http.put(`${baseUrl}/airport`, airport);
  }

  deleteAirport(id: number): Observable<any>{
    return this.http.delete(`${baseUrl}/airport/deleteAirport/${id}`,{ responseType: 'text'});
  }

}
