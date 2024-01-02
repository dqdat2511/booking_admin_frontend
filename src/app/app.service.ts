import { Inject, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  url = 'http://localhost:5050/api/v1/';
  constructor(private http: HttpClient,
    private datePipe: DatePipe,) {}
  getUrlTime(){
    return this.url + 'time';
  }
  getUrlTicket(){
    return this.url + 'ticket';
  }
  getUrlSeat(){
    return this.url + 'seat/trip';
  }
  getUrlList(){
    return this.url + 'seat/list';
  }
  getUrlBusType(){
    return this.url + 'bus/type';
  }
  getUrlTrip(){
    return this.url + 'trip';
  }
  getUrlTripDetail(){
    return this.url + 'trip/detail'
  }
  getUrlTripSeatDetail(){
    return this.url + 'seat/trip'
  }
  getUrlUser(){
    return this.url + 'passanger'
  }
  getUrlAddress(){  
    return this.url + 'address'
  }
  formatDateVietNam(date: Date | null): any {
    return date ? this.datePipe.transform(date, 'dd/MM/yyyy') : '';
  }
 
}
