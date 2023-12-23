import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Client } from '../Model/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url ='';
  private client! : Client;
 // constructor(private http: HttpClient, private appService: AppService) { }
  getType(){
    // this.url = this.appService.getUrlBusType();
    // return this.http.get(`${this.url}`).pipe();
  }
  addClient(client : Client){
     client = this.client
  }
}
