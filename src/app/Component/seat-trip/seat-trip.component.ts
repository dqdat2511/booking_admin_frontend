import { Component,Input, Output,EventEmitter,inject } from '@angular/core';
import { ReceiptModel } from 'src/app/TripTest/Receipt';
import { Destination, TripModel } from 'src/app/TripTest/TripModel';
import { Receipt } from 'src/app/TripTest/Receipt';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
interface Seat {
  id_trip: number; 
  choose: boolean;
  num: string;
  price: number;
}
interface BusType{
  id : number;
  numeber_seat : {
    floor : number;
  }
  
}
interface Trip{
  id : number;
  Start_time: Date;
  name : string;
  max_slot : number;
}

@Component({
  selector: 'app-seat-trip',
  templateUrl: './seat-trip.component.html',
  styleUrls: ['./seat-trip.component.scss']
})
export class SeatTripComponent {
  @Input() desId!: number;
  @Input() tripId!: number;
  @Output() confirmEvent = new EventEmitter<Receipt[]>();
  total = 0;
  seatNo1 : Seat[]= [];
  showSeatList:Seat[]=[];
  isOn : boolean = false;
  isStarted : boolean = false;
  isEnough: boolean = true;
  isTwoFloor: boolean = false;
  alert=false;
  message: string = ""; 
  receiptModel = new ReceiptModel()
  receiptNew:Receipt[] = []
  busFloor : BusType[] = [{
    'id': 1, 
    'numeber_seat':{
      'floor' : 1
    }
    
  },
  {
    'id': 2,
    'numeber_seat':{
      'floor' : 0
    }
  }
  ]
    
  trip : Trip[] = [ {
    'id': 1,
    'max_slot': 100,
    'name': "Sài Gòn đi Bình Định",
    'Start_time': new Date('12/17/2023, 14:30') // Example date and time
  },
  {
    'id': 2,
    'max_slot': 10,
    'name': "Sài Gòn đi Bến Tre",
    'Start_time': new Date('12/17/2028, 2:30') // Example date and time
  }
  ]
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
    let seatCount = this.seatNo.find(seat => seat.num === key);
    let seatRemove: Array<Seat>;
    seatRemove = this.seatNo.filter(seat => seat.num === key);
    if(id?.classList.contains("selected")){
      id.classList.remove('selected')
      if(seatCount){
        this.removeList(seatRemove);
        this.minusFare(seatCount.price);
       }
    }
    else if(id?.classList.contains("booked")){
      window.alert("Ghế đã được mua")
    }
    else
    {
      if((this.showSeatList.length < 4)) {       
        id?.classList.add('selected')
        if(seatCount){
         this.showList(seatCount);
         this.totalFare(seatCount.price);
        }
      }else{
        this.alertOn("Chỉ được đặt 4 vé 1 lần");
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
    let id= document.getElementById(key) 
     id?.classList.add('booked')
  
  }
  checkBoughtTicket(id:number){
    let seatCount: Array<Seat>;
    seatCount = this.seatNo.filter(seat => seat.id_trip === id);
    let choosenSeat: Array<Seat>;
    choosenSeat = seatCount.filter(choose => choose.choose === false)
    if(seatCount){
    for (let index = 0; index < choosenSeat.length; index++) {
      const element = choosenSeat[index];
      this.changeColorBookTicket(element.num);
    }
    }else{
      console.log(false)
    }
  }

isMoreThanOneFloor(id: number): boolean {
  // Find the bus floor with the given id
  const busFloor = this.busFloor.find(floor => floor.id === id);
  if( !!busFloor && busFloor.numeber_seat.floor >= 1 ){
    this.isTwoFloor = true;
  }else{
    this.isTwoFloor = false;
  }
  return this.isTwoFloor;
}

checkCurrentDate(id:number) : boolean{

  // Get the current date and time
  const currentDateTime: Date = new Date();
  // Find the trip with id 1
  const trip = this.trip.find(time => time.id === id);
  if (trip) {
    // Get the trip's start time as a Date object
    const tripStartTime: Date = new Date(trip.Start_time);

    // Compare the current date and time with the trip's start time
    if (currentDateTime >= tripStartTime) {
      this.message="The trip has started or is in progress.";  
      this.isStarted = false; 
      console.log(this.message)
      return this.isStarted;
    } else {
      console.log('The trip has not started yet.');
      this.isStarted = true
      return this.isStarted;
    }
  } else {
    console.log ('Trip with id 1 not found.') ;
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

checkSeat(id : number) : boolean{
  let seatCount: Array<Seat>;
  seatCount = this.seatNo.filter(seat => seat.id_trip === id);
  this.seatNo1 = seatCount
  let trip_seat = this.trip.find(seat => seat.id === id)?.max_slot
  let choosenSeat = seatCount.filter(choose => choose.choose === false).length
  if(trip_seat! <= choosenSeat){
    this.isEnough = false;
    this.message = "full seat, please create new one";
    console.log(this.message)
  }
  this.checkBoughtTicket(id);
  return this.isEnough
}

confirmJourney(){
  let seats=[];
  seats= this.showSeatList.map(iteam=>{   
  return iteam.num 
});
if(seats.length == 0){
  window.alert("Bạn chưa chọn vé")
  }else{
  window.alert("Bạn đã đặt thành công vé: "+ seats  );
  for (let index = 0; index < seats.length; index++) {
    const element = seats[index];
    this.changeColorBookTicket(element)  
  }
  }
  this.createReceipt(seats);
  this.bookEvent();
}


bookEvent():void{
  this.confirmEvent.emit(this.receiptNew);
}
createReceipt(seat: Array<string>){
  let destination: Destination[] = new TripModel().getDestination(this.tripId, this.desId);
   this.receiptNew  = 
    [{
    id_trip: this.tripId,
    destination: destination,
    client: "Nguyen van A",
    seat: seat,
    total: this.total}]
  
  this.receiptModel.createReceipt(this.receiptNew);
}
totalFare(fare:number){
  this.total+=fare;
}
minusFare(fare:number){
  this.total-=fare;
}
 seatNo: Seat[] = [
  { 'id_trip': 1, 'num': 'A01', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A02', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A03', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A04', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A05', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A06', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A07', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A08', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A09', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A10', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A11', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A12', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A13', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A14', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A15', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A16', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A17', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A18', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A19', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A20', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A21', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A22', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'A23', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B01', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B02', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B03', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B04', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B05', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B06', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B07', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B08', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B09', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B10', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B11', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B12', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B13', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B14', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B15', 'choose': false, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B16', 'choose': true, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B17', 'choose': true, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B18', 'choose': true, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B19', 'choose': true, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B20', 'choose': true, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B21', 'choose': true, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B22', 'choose': true, 'price': 150.000 },
  { 'id_trip': 1, 'num': 'B23', 'choose': true, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A01', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A02', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A03', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A04', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A05', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A06', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A07', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A08', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A09', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A10', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A11', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A12', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A13', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A14', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A15', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A16', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A17', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A18', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A19', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A20', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A21', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A22', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'A23', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B01', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B02', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B03', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B04', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B05', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B06', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B07', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B08', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B09', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B10', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B11', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B12', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B13', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B14', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B15', 'choose': false, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B16', 'choose': true, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B17', 'choose': true, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B18', 'choose': true, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B19', 'choose': true, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B20', 'choose': true, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B21', 'choose': true, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B22', 'choose': true, 'price': 150.000 },
  { 'id_trip': 2, 'num': 'B23', 'choose': true, 'price': 150.000 }
];

}

