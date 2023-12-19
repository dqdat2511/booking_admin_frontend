import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class BusTypeService {
  url ='';
  constructor(private http: HttpClient, private appService: AppService) { }
  getType(){
    this.url = this.appService.getUrlBusType();
    return this.http.get(`${this.url}`).pipe();
  }
}
