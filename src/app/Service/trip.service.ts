import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  url = '';

  constructor(private http: HttpClient, private appService: AppService) { }
  getTrip(){
    this.url = this.appService.getUrlTrip();
    return this.http.get(`${this.url}`).pipe();
  }
  getTripById(tripId: string): Observable<any> {
    this.url = this.appService.getUrlTripDetail();
    return this.http.get(`${this.url}?id=${tripId}`).pipe();
  }
  addTrip(name: any, timetrip: any, type: any){
    let obj = {name, timetrip:{id:timetrip}, type:{id: type}};
    return this.http.post(`${this.url}`, obj, {
      headers: {'Content-Type': 'application/json'},
      responseType: 'text',
    }).pipe();
  }
}
