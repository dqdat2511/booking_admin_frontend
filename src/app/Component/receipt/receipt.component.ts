import { Component, Input } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { Ticket } from 'src/app/Model/Ticket';
import { TicketService } from 'src/app/Service/ticket.service';
import { AppService } from 'src/app/app.service';

export interface Ticket2 {
  id?:string,
  name_trip?:string,
  name_customer: string;
  number_phone:string;
  number_tickets:string,
  address:string;
  code?:string;
  seat:string[]
}

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})

export class ReceiptComponent  {
  @Input() receipt!:  Array<Ticket>;
  ticket: Array<Ticket2> = [];
  time!:  Date[]
  isOn:boolean = false
  constructor(public appService: AppService, private ticketService: TicketService) {
    // Check if receipt is defined before using find
    
  }
  ngOnInit(): void {
    this.fetchTicketDetails()
  }
   fetchTicketDetails() {
    try {
      let ticket2!: Ticket2
      if (this.receipt) {  
        for (let index = 0; index < this.receipt.length; index++) {
          let element = this.receipt[index].id?.toString();
          this.ticketService.getTicketByID(element!).subscribe((data :any)=>{
           ticket2 = data 
          })
          this.ticket.push(ticket2)
          console.log(this.ticket)
        }
       
      }
    } catch (error) {
      console.error('Error fetching ticket details', error);
    }
  }

}
