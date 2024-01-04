import { Component, Input } from '@angular/core';
import { Seat } from 'src/app/Model/Seat';
import { Trip } from 'src/app/Model/trip';
import { Ticket2 } from '../receipt/receipt.component';

@Component({
  selector: 'app-print-templ',
  templateUrl: './print-templ.component.html',
  styleUrls: ['./print-templ.component.scss']
})
export class PrintTemplComponent {
  @Input() trip!:Trip
  @Input() pagedSeatNo!:Seat[]
  @Input() ticket!:Ticket2[]
  mappingData(key:any):Ticket2{
    try {
      let bookTicket: Ticket2 | undefined;
      
      this.ticket.forEach(ticket => {
        if (ticket.seat.includes(key)) {
          bookTicket = ticket;
          let id = document.getElementById(key);
          id?.classList.remove('empty')
        }
      });
      if (bookTicket !== undefined) {
        return bookTicket;
      } else {
        throw new Error(`Ticket not found for seat: ${key}`);
      }
    } catch (error) {
      throw error
    }
      
    }
}
