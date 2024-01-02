import { Component, Input } from '@angular/core';
import {Sort} from '@angular/material/sort';
import { TicketService } from 'src/app/Service/ticket.service';
import { AppService } from 'src/app/app.service';

export interface Ticket2 {
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
  @Input() receipt!: string;
  ticket!: Ticket2
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
      if (this.receipt) {
        this.ticketService.getTicketByID(this.receipt).subscribe((data :any)=>{
          this.ticket = data
        })
      }
    } catch (error) {
      console.error('Error fetching ticket details', error);
    }
  }

}
