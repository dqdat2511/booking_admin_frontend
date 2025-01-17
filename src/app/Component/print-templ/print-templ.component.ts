import { Component, DoCheck, Input } from '@angular/core';
import { Seat } from 'src/app/Model/Seat';
import { Trip } from 'src/app/Model/trip';
import { Ticket2 } from '../receipt/receipt.component';

@Component({
  selector: 'app-print-templ',
  templateUrl: './print-templ.component.html',
  styleUrls: ['./print-templ.component.scss']
})
export class PrintTemplComponent{
  @Input() isTwoFloor!: boolean 
  @Input() trip!:Trip
  @Input() pagedSeatNo!:Seat[]
  @Input() ticket!:Ticket2[]

  // ngDoCheck() {
  //   this.isMoreThanOneFloor1();    
  // }

  mappingData(key:any):Ticket2{
    try {
      let bookTicket: Ticket2 | undefined;
      
      bookTicket = this.ticket.find(ticket => ticket.seat === key)
     //có data thì remove id 'empty'
  
      if (bookTicket !== undefined) {
        return bookTicket;
      } else {
        throw new Error(`Ticket not found for seat: ${key}`);
      }
    } catch (error) {
      throw error
    }
      
    }

    // isMoreThanOneFloor1() {
    //   // Find the bus floor with the given id
    //   const busFloor = this.trip.seats.numbers_floor;
    //   if( !!busFloor && busFloor >= 1 ){
    //     this.isTwoFloor = true;
    //   }else{
    //     this.isTwoFloor = false;
    //   }
    // }
}
