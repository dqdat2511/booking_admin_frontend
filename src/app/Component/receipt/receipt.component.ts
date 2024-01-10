import { Component, Input,OnInit } from '@angular/core';
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

export class ReceiptComponent implements OnInit {
  @Input() receipt!:  Array<Ticket>;
  ticket: Ticket2[] = [];
  isOn:boolean = false
  constructor(public appService: AppService, private ticketService: TicketService) {
    // Check if receipt is defined before using find
    
  }
  ngOnInit(){
    this.fetchTicketDetails()
  }
   fetchTicketDetails(){
    for (let index = 0; index < this.receipt.length; index++) {
      const element = this.receipt[index];
      let ticket2: Ticket2
      this.ticketService.getTicketByID(element.id!).subscribe((data:any)=>{
        ticket2 = data
        this.ticket.push(ticket2)
        
      })
    }
     
  }

}
