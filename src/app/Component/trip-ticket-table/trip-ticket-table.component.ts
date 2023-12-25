import { Component, Input } from '@angular/core';
import {Sort, MatSortModule} from '@angular/material/sort';
import {NgFor} from '@angular/common';
import { Ticket } from 'src/app/Model/Ticket';
import { AppService } from 'src/app/app.service';
import { SeatService } from 'src/app/Service/seat.service';
import { Ticket2 } from '../receipt/receipt.component';
@Component({
  selector: 'app-trip-ticket-table',
  templateUrl: './trip-ticket-table.component.html',
  styleUrls: ['./trip-ticket-table.component.scss']
})
export class TripTicketTableComponent {
  @Input() tripId!:string
  ticket!: Ticket2[]
 // sortedData: Ticket2[];
 // displayedColumns: string[] = ['name_trip', 'name_customer','number_phone','code', 'number_tickets', 'address' , 'seat'];
  displayedColumns: string[] = ['name_customer','number_phone','address'];
  constructor(public appService: AppService, 
    private seatService: SeatService) {
    //  this.sortedData = this.ticket.slice();
  }
  
  ngOnInit() {
    this.getData();
  }
  getData(){
    this.seatService.getSeatListByTripID(this.tripId).subscribe((data=>{
      this.ticket = data
    }))
  }
  sortData(sort: Sort) {
    console.log(this.ticket.flatMap(ticket => ticket.seat))
    const data = this.ticket.slice();
    
    if (!sort.active || sort.direction === '') {
    //  this.sortedData = data;
      return;
    }

    // this.sortedData = data.sort((a, b) => {
    //   const isAsc = sort.direction === 'asc';
    //   switch (sort.active) {
    //     case 'name':
    //       return compare(a.name_customer, b.name_customer, isAsc);
    //     case 'calories':
    //       return compare(a.number_phone, b.number_phone, isAsc);
    //     case 'fat':
    //       return compare(a.seat, b.fat, isAsc);
    //     case 'carbs':
    //       return compare(a.carbs, b.carbs, isAsc);
    //     case 'protein':
    //       return compare(a.protein, b.protein, isAsc);
    //     default:
    //       return 0;
    //   }
    // });
  }
  
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}