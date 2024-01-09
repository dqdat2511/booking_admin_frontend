import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';
import { Ticket } from '../Model/Ticket';

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
  addTicket(ticket:Ticket[]): Observable<any>{
    // let obj = {
      
    //   customer_name: customer_name,
    //   customer_phone: customer_phone,
    //   address: address,
    //   trip: {id:trip_id},
    //   id_seat:{ id: sloots }
        
    // };
    
    const body = JSON.stringify(ticket);
    return this.http.post(`${this.url}`, body,{
      headers: {'Content-Type': 'application/json'},
      responseType: 'text',
    }).pipe();
  }
  getTicketByID(ticketId: string): Observable<any> {
    this.url = this.appService.getUrlTicket();
    return this.http.get(`${this.url}?id=${ticketId}`).pipe();
  }
  updateTicket(ticket:Ticket): Observable<any>{
    const body = JSON.stringify(ticket);
    return this.http.put(`${this.url}`, body,{
      headers: {'Content-Type': 'application/json'},
      responseType: 'text',
    }).pipe();
  }
}
