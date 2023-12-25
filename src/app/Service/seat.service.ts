import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  url = '';

  constructor(private http: HttpClient, private appService: AppService) { }
  getSeatByTripID(tripId: string): Observable<any> {
    this.url = this.appService.getUrlTripSeatDetail();
    return this.http.get(`${this.url}?id=${tripId}`).pipe();
  }
  getSeatListByTripID(tripId: string): Observable<any> {
    this.url = this.appService.getUrlList();
    console.log(`${this.url}?id=${tripId}`)
    return this.http.get(`${this.url}?id=${tripId}`).pipe();
  }
}
