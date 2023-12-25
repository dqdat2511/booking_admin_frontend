import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';
import { CheckValidResponse } from '../Response/check-valid-response';
import { Trip } from '../Model/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  url = '';

  constructor(private http: HttpClient, private appService: AppService) {
    this.url = this.appService.getUrlTrip();
   }
  getTrip(){
    return this.http.get(`${this.url}`).pipe();
  }
  checkValid(index: string) : Observable<CheckValidResponse> {
    this.url = this.appService.getUrlSeat();
    let params = new HttpParams().set('id', index.toString());
    return this.http.get<CheckValidResponse>(`${this.url}/check`, {params}).pipe();
  }
  getTripToReady() :Observable<Trip>{

    return this.http.get<Trip>(`${this.url}/ready`).pipe();
  }
  addTrip(name: any, timetrip: any, type: any){
    let obj = {name, timetrip:{id:timetrip}, type:{id: type}};
    return this.http.post(`${this.url}`, obj, {
      headers: {'Content-Type': 'application/json'},
      responseType: 'text',
    }).pipe();
  }
}
