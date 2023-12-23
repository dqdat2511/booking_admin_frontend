import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TimeService {
  url = '';
  constructor(private service: AppService, private http: HttpClient) {
    this.url = this.service.getUrlTime();
   }
   addTime(startDay: any, startTime: any, endDay: any, endTime: any): Observable<any>{
    let obj = {
      start_time: startTime, 
      end_time: endTime, 
      start_day: startDay, 
      end_day: endDay
    }
    const body = JSON.stringify(obj);

    return this.http.post(`${this.url}`, body,{
      headers: {'Content-Type': 'application/json'},
      responseType: 'text',
    }).pipe();
   }
   getTime(): Observable<any>{
    return this.http.get(`${this.url}`).pipe();
   }
}
