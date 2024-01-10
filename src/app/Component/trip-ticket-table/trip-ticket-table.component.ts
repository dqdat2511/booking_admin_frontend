import { Component, ElementRef, Input, ViewChild,OnInit, Output, EventEmitter, DoCheck } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { SeatService } from 'src/app/Service/seat.service';
import { Ticket2 } from '../receipt/receipt.component';
import { Seat } from 'src/app/Model/Seat';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { TripService } from 'src/app/Service/trip.service';
import { Trip } from 'src/app/Model/trip';
import { Ticket } from 'src/app/Model/Ticket';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-trip-ticket-table',
  templateUrl: './trip-ticket-table.component.html',
  styleUrls: ['./trip-ticket-table.component.scss']
})
export class TripTicketTableComponent implements OnInit{
  @Input() tripId!:string
  isTwoFloor: boolean = false;
  @Output() showSeatListEvent = new EventEmitter<Seat[]>();
  @Output() putTicketEvent = new EventEmitter<Ticket2>();
  trip!:Trip
  length= 0;
  seatNo!:Seat[]
  ticket!: Ticket2[]
  @ViewChild('content', {static:false})el!: ElementRef
  @ViewChild('Printcontent', {static:false})content!: ElementRef
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 24; // Set an initial page size
  pagedSeatNo: Seat[] = [];
  total = 0;
  showSeatList:Seat[]=[];
  showTicketList:Ticket2[] = [];
  isBooking = false;
  hideTableSeat = false;
  constructor(public appService: AppService, 
    private seatService: SeatService,
    private tripService: TripService,
    private toast: NgToastService) {
  }
 
  ngOnInit() {
    this.getData();    
  }

  getData(){
    this.seatService.getSeatListByTripID(this.tripId).subscribe((data=>{
      this.ticket = data 
    }))
    this.seatService.getSeatByTripID(this.tripId).subscribe((data :any)=>{
      this.seatNo = data   
      this.length=this.seatNo.length
      
      this.initializePaginator();

    })
   this.tripService.getTripById(this.tripId).subscribe((data: any)=>{
    if(data){
      this.trip = data
      this.isMoreThanOneFloor(data)
      if(this.isTwoFloor){
        this.pageSize = 23
      }
    }
   })
  
  }

  mappingData(key:any):Ticket2{
  try {
    let bookTicket: Ticket2 | undefined;
    
    bookTicket = this.ticket.find(ticket => ticket.seat === key)
     //có data thì remove id 'empty'
     let id = document.getElementById(key)
     id?.classList.remove("empty")
    if (bookTicket !== undefined) {
      return bookTicket;
    } else {
      throw new Error(`Ticket not found for seat: ${key}`);
    }
  } catch (error) {
    throw error
  }
    
  }
 
  initializePaginator() {
    if (this.paginator) {
      this.paginator.firstPage(); 
     
      this.handlePage({
        pageIndex: 0,
        pageSize: this.pageSize,
        length: this.seatNo.length,
      } as PageEvent);
    }
  }
   handlePage(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedSeatNo = this.seatNo.slice(startIndex, endIndex );

  }


  printTest(){
    window.print();
  }


//nqd1111 start
  IsChoose(key:any){
  
    this.changeSeatColor(key)
    
    
  }

  changeSeatColor(key:any){
    let id= document.getElementById(key)
    let seatCount = this.pagedSeatNo.find(seat => seat.name_slot === key);
    let seatRemove: Array<Seat>;
    seatRemove = this.pagedSeatNo.filter(seat => seat.name_slot === key);
    if(id?.classList.contains("selected")){
      id.classList.remove('selected')
      if(seatCount){
        this.removeList(seatRemove);
        this.minusFare(150);
        this.showTicketList = []
       }
    }
    else if(id?.classList.contains("booked")){
      window.alert("Ghế đã được mua")
    }
    else
    {     
        if(seatCount){
          if(seatCount?._available ){
            this.showList(seatCount);
            id?.classList.add('selected')    
          }else if(!seatCount?._available && this.showTicketList.length == 0 && this.showSeatList.length == 0)
          {
            this.showList(seatCount);
            this.showListTicket(this.mappingData(key))
            id?.classList.add('selected')
          }else{
            this.showError()
          }       
        }
    }
    if(this.showSeatList){
      this.showSeatListEvent.emit(this.showSeatList);
      console.log(this.showSeatList)
    }
    if(this.showTicketList){
     this.putTicketEvent.emit(this.showTicketList[0]) 
     console.log(this.showTicketList)
    }
  }
  showError() {
    this.toast.error({detail:"ERROR",summary:'Vui lòng sửa thông tin cho từng vé',duration:2000});
  }
  removeList(seat: Seat[]): void {
    // Filter out the seats to be removed from showSeatList
    this.showSeatList = this.showSeatList.filter(existingSeat => !seat.includes(existingSeat));
  
    
  }

  minusFare(fare:number){
    this.total-=fare;
  }

  totalFare(fare:number){
    this.total+=fare;
  }

  showList(seat:Seat){
    this.showSeatList.push(seat);
}

isMoreThanOneFloor(trip : Trip) {
  // Find the bus floor with the given id
  const busFloor = trip.seats.numbers_floor;
  if( !!busFloor && busFloor >= 1 ){
    this.isTwoFloor = true;
  }else{
    this.isTwoFloor = false;
  }
}

//nqd1111 end

showListTicket(ticket:Ticket2){
  this.showTicketList.push(ticket);
}
}
