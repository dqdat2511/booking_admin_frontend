import { Component,Input, Output,EventEmitter,inject, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Trip } from 'src/app/Model/trip';
import { Seat } from 'src/app/Model/Seat';
import { SeatService } from 'src/app/Service/seat.service';
import { TicketService } from 'src/app/Service/ticket.service';
import { Ticket } from 'src/app/Model/Ticket';
import { Client } from 'src/app/Model/Client';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-seat-trip',
  templateUrl: './seat-trip.component.html',
  styleUrls: ['./seat-trip.component.scss']
})
export class SeatTripComponent implements OnInit  {
  @Input() desId!: number;
  @Input() tripData!: Trip;
  @Input() client!:Client
  @Output() confirmEvent = new EventEmitter<string>();
  total = 0;
  seatNo1 : Seat[]= [];
  showSeatList:Seat[]=[];
  isStarted : boolean = false;
  isEnough: boolean = true;
  isTwoFloor: boolean = false;
  alert=false;
  message: string = ""; 
  trip: Trip[] = [];
  receiptNew!:Ticket;
  idTicket!:string
    

  constructor(public appService: AppService, 
    private seatService: SeatService,
    private ticketService: TicketService,
    private toast: NgToastService) { }
    ngOnInit(): void {
      this.getData()
      this.checkCurrentDate()
      this.checkSeat()
    }
  
  IsChoose(key:any){
    this.changeSeatColor(key)
  }

  showList(seat:Seat){
    this.showSeatList.push(seat);
}
removeList(seat: Seat[]): void {
  // Filter out the seats to be removed from showSeatList
  this.showSeatList = this.showSeatList.filter(existingSeat => !seat.includes(existingSeat));
}
  changeSeatColor(key:any){
    let id= document.getElementById(key)
    let seatCount = this.seatNo1.find(seat => seat.name_slot === key);
    let seatRemove: Array<Seat>;
    seatRemove = this.seatNo1.filter(seat => seat.name_slot === key);
    if(id?.classList.contains("selected")){
      id.classList.remove('selected')
      if(seatCount){
        this.removeList(seatRemove);
        this.minusFare(150);
       }
    }
    else if(id?.classList.contains("booked")){
      window.alert("Ghế đã được mua")
    }
    else
    {
           
        id?.classList.add('selected')
        if(seatCount){
         this.showList(seatCount);
         this.totalFare(150);
        }

   
    }
  }
  alertOn(message: string){
    this.alert=true;
    this.message = message;
        setTimeout(() => {
          // Sau 3 giây, đặt this.alert thành false
          this.alert = false;
        }, 1500);
  }

  changeColorBookTicket(key:any){
    let id = document.getElementById(key) 
     id?.classList.add('booked')
  
  }
  checkBoughtTicket(){
    let seatCount: Array<Seat>;
    seatCount = this.seatNo1.filter(seat => !seat._available);
    if(seatCount){
    for (let index = 0; index < seatCount.length; index++) {
      const element = seatCount[index];
      this.changeColorBookTicket(element.name_slot);
    }
    }else{
      console.log(false)
    }
  }

isMoreThanOneFloor(): boolean {
  // Find the bus floor with the given id
  const busFloor = this.tripData.seats.numbers_floor;
  if( !!busFloor && busFloor >= 1 ){
    this.isTwoFloor = true;
  }else{
    this.isTwoFloor = false;
  }
 this.checkBoughtTicket()
  return this.isTwoFloor;
}

checkCurrentDate() : boolean{
  
  // Get the current date and time
  const currentDateTime: Date = new Date();
  if (this.tripData) {
    const tripStartTime: Date = new Date(`${this.tripData.time.start_day}T${this.tripData.time.start_time}`);
    if (currentDateTime >= tripStartTime) {
      this.message="The trip has started or is in progress.";  
      this.isStarted = false; 
      return this.isStarted;
    } else {
     // console.log('The trip has not started yet.');
       this.isStarted = true
      return this.isStarted;
    }
  } else {
    //console.log ('Trip with id 1 not found.') ;
  }
  return this.isStarted;
}

onFloor2() {
  let floor2 = document.getElementById("floor-2");
  if (floor2) {
    if (floor2.style.display === "none") {
      floor2.style.display = "block";
    } else {
      floor2.style.display = "none";
    }
  }
}
getData() {
  this.seatService.getSeatByTripID(this.tripData.id).subscribe((data :any)=>{
    this.seatNo1 = data   
  })
}
checkSeat() : boolean{
  let trip_seat = this.tripData.seats.maxslot
  let choosenSeat = this.seatNo1.filter(choose => choose._available === false).length
  if(trip_seat <= choosenSeat){
    this.isEnough = false;
    this.message = "full seat, please create new one";
  }
  //this.checkBoughtTicket();

  return this.isEnough
  
}

confirmJourney(){
  let seats=[];
  let seatNum=[]
  seats= this.showSeatList.map(iteam=>{   
  return iteam.id 
});
seatNum= this.showSeatList.map(iteam=>{   
  return iteam.name_slot 
});
if(seats.length == 0){
  window.alert("Bạn chưa chọn vé")
  }else{
 // window.alert("Bạn đã đặt thành công vé: "+ seatNum  );
  for (let index = 0; index < seatNum.length; index++) {
    const element = seatNum[index];
    this.changeColorBookTicket(element)  
  }
  }
  this.createReceipt(seats);
  this.showSuccess(seatNum);
}
showSuccess(seatNum:any[]) {
  this.toast.success({detail:"SUCCESS",summary:'Đặt ghế '+ seatNum +' thành công',duration:3000});
}
bookEvent(id:any):void{
  this.confirmEvent.emit(id);
}

createReceipt(seat: Array<string>){
  let customer_name =this.client.customer_name;
  let customer_phone=  this.client.customer_phone;
  let address = this.client.address;
  let num_ticket = seat.length;
  let trip_id = this.tripData.id
  let sloots  =  seat
    
  
   this.ticketService.addTicket(customer_name,customer_phone,address,num_ticket,trip_id,sloots).subscribe(
    (response:any) => {  
      this.idTicket = JSON.parse(response)
     this.bookEvent(this.idTicket);
    },
    (error) => {
      console.error('Error:', error);
      // Handle the error here
    }
  );
}
totalFare(fare:number){
  this.total+=fare;
}
minusFare(fare:number){
  this.total-=fare;
}


}

function showSuccess() {
  throw new Error('Function not implemented.');
}

