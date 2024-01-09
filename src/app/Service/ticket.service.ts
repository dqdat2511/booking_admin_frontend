import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  url = '';

  constructor(private http: HttpClient, private appService: AppService) {
    this.url = this.appService.getUrlTicket();
   }
  getTrip(){
    this.url = this.appService.getUrlTicket();
    return this.http.get(`${this.url}`).pipe();
  }
  addTicket(customer_name: any,customer_phone:any,address:any,num_tickets:any, trip_id: any, sloots: any[]): Observable<any>{
    let obj = {
      
      customer_name: customer_name,
      customer_phone: customer_phone,
      address: address,
      num_tickets: num_tickets,
      trip: {id:trip_id},
      sloots: sloots.map(id => ({ id: id }))
        
    };
    const body = JSON.stringify(obj);
    console.log(body);
    return this.http.post(`${this.url}`, body,{
      headers: {'Content-Type': 'application/json'},
      responseType: 'text',
    }).pipe();
  }
  getTicketByID(ticketId: string): Observable<any> {
    this.url = this.appService.getUrlTicket();
    return this.http.get(`${this.url}?id=${ticketId}`).pipe();
  }
}
