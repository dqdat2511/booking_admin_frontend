import { Inject, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  url = 'http://localhost:5050/api/v1/';  
  constructor(private http: HttpClient,
    private toast: NgToastService,
    private datePipe: DatePipe,) {}
  getUrlTime(){
    return this.url + 'time';
  }
  getUrlTicket(){
    return this.url + 'ticket';
  }
  getUrlSeat(){
    return this.url + 'seat';
  }

  getUrlBusType(){
    return this.url + 'bus/type';
  }
  getUrlTrip(){
    return this.url + 'trip';
  }
  
  formatDateVietNam(date: Date | null): any {
    return date ? this.datePipe.transform(date, 'dd/MM/yyyy') : '';
  }
  notifySuccess(title: string, message: string): void{
    this.toast.success({detail:title,summary:message,duration:5000, position:'topRight'});
  }
  notifyError(title: string, message: string): void{
    this.toast.error({detail:title,summary:message,duration:5000, position:'topRight'});
  }
  notifyWarning(title: string, message: string): void{
    this.toast.warning({detail:title,summary:message,duration:5000, position:'topRight'});
  }
 
}
