import { Inject, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  url = 'https://localhost:5050/api/v1/';
  constructor(private http: HttpClient) {}
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
    return this.url + '/seat/list';
  }
}
