import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Client } from '../Model/Client';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url ='';
  private client! : Client;
  constructor(private http: HttpClient, private appService: AppService) {
    this.url = this.appService.getUrlUser();
   }
  getPhone(){
    this.url = this.appService.getUrlUser();
    return this.http.get(`${this.url}/phoneNumbers`).pipe();
  }
  addClient(client: Client): Observable<any> {
    const name_client = client.customer_name;
    const phone_client = client.customer_phone;
    const obj = {    
      name: name_client,
      phone: phone_client,  
      number_trip: 0 
    };
    const body = JSON.stringify(obj);
    return this.http.post(`${this.url}`, body, {
      headers: {'Content-Type': 'application/json'},
      responseType: 'text',
    }).pipe(
      catchError(error => {
        console.error('API Request Error:', error);
        throw error; // Rethrow the error for further handling
      })
    );
  }
   getClientByPhone(phone: string): Observable<any> {
    this.url = this.appService.getUrlUser();
    return this.http.get(`${this.url}/search?phone=${phone}`).pipe();
  }
}
