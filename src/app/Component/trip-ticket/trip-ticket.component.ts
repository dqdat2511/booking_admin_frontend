import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import { Trip } from 'src/app/Model/trip';
import { AppService } from 'src/app/app.service';
import { TripService } from 'src/app/Service/trip.service';

import { Client } from 'src/app/Model/Client';
import { ClientService } from 'src/app/Service/Client.service';
import { BusType } from 'src/app/Model/BusType';
import { TimeTrip } from 'src/app/Model/time';
import { AddressService } from 'src/app/Service/address.service';
import { Address } from 'src/app/Model/Address';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { Seat } from 'src/app/Model/Seat';
import { TicketService } from 'src/app/Service/ticket.service';
import { SeatService } from 'src/app/Service/seat.service';
import { Ticket2 } from '../receipt/receipt.component';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-trip-ticket',
  templateUrl: './trip-ticket.component.html',
  styleUrls: ['./trip-ticket.component.scss']
})
export class TripTicketComponent {
  
  search:boolean = false;
  uniqueTrips: Trip[] = [];
  tripInfo2: Trip[] = [] ;
  trip!: Trip;
  selectTrip :any ;
  tripName:any;
  firstFormGroup = this._formBuilder.group({
    tripCtrl: ['', Validators.required],
    timeCtrl:['']
  });

 

  stepperOrientation: Observable<StepperOrientation>;
//nqd1111 start
  idTicket!:string
  @Output() confirmEvent = new EventEmitter<string>();
  @Input() showSeatList!:Seat[];
  ticket!: Ticket2[]
  seatNo!:Seat[]
  length= 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 24;
  pagedSeatNo: Seat[] = [];

  idChoose: boolean = false;
  client!:Client;
  timeTrip:TimeTrip[] = []
  typeBus: BusType[]=[]
  receiptNew!: string;
  key : string =''
  idTrip?: number;
  ticketOn:boolean = false;
  options:string[] =[]
  isBook: boolean = false;
  isOptional = true;
  message: string = "";
  phoneCtrl = new FormControl('');
  filteredOptions!: Observable<string[]>;
  firstFormGroup2 = this._formBuilder.group({
    nameCtrl: ['', Validators.required], 
    addressCtrl: ['', Validators.required],
    address2Ctrl: ['', Validators.required],
  });
//nqd1111 end

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver,public appService: AppService, 
    private tripService: TripService, 
    private clientService: ClientService,
    private addressService: AddressService,
    private ticketService: TicketService, private seatService: SeatService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
      this.init();
  }
  //nqd1111 start
  ngOnInit(){
    this.getAllPhone();
    this.validation();
    this.getData();
  }

  getData(){
    this.seatService.getSeatListByTripID(this.selectTrip).subscribe((data=>{
      this.ticket = data 
    }))
    this.seatService.getSeatByTripID(this.selectTrip).subscribe((data :any)=>{
      this.seatNo = data   
      this.length=this.seatNo.length
      this.initializePaginator();
    })
   this.tripService.getTripById(this.selectTrip).subscribe((data: any)=>{
    if(data){
      this.trip = data
    }
   })
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
    this.pagedSeatNo = this.seatNo.slice(startIndex, endIndex);
  }

  //nqd1111 end

  init(){
    const uniqueTripsSet : string[] = [];
    let tripInfo: Trip[] = []
    this.tripService.getTrip().subscribe((data: any) =>{
      tripInfo = data;
      tripInfo.forEach(trip => {
        if(!uniqueTripsSet.includes(trip.name)){
          uniqueTripsSet.push(trip.name);
          this.uniqueTrips.push(trip)   
        }
       })
    })
  }
  onSelected(value:any): void {
    // this.trips = new TripModel().getPlace(value);
    // this.idTrip = value;
    this.tripName = value;
    this.firstFormGroup.get('timeCtrl')?.reset();
    let tripInfo: Trip[] = []
    this.tripService.getTrip().subscribe((data : any)=>{
      tripInfo = data;
      this.tripInfo2 = tripInfo.filter(data => data.name === value);   
    })
    
	}
 
  onSelectedPlace(value:any): void {	
    this.search= false;
    const selectedTrip = this.tripInfo2.find(trip => trip.time.id === value);
    if (selectedTrip) {
      this.selectTrip = selectedTrip.id;
      this.tripService.getTripById(selectedTrip.id).subscribe((data :any)=>{
        this.trip  = data     
      })
    }  
   
  }
  searchTrip(){
    this.search = true;    
}

validation(){
  this.phoneCtrl = new FormControl('', [
    Validators.required,
    Validators.minLength(9),
     // Bắt buộc nhập     
  ]);
}
private _filter(value: string): string[] {
  const filterValue = value
  return this.options.filter(option => option.includes(filterValue));
}
getAllPhone(){
  this.clientService.getPhone().subscribe((data:any)=>{
    this.options = data
    this.filteredOptions = this.phoneCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  })
}
selectDes = 0;



getTicket(){
  if(this.receiptNew){
  this.isBook = false;
  this.ticketOn = true
}else{
  this.message = "Bạn chưa chọn ghế, vui lòng chọn ghế và thanh toán để lấy hóa đơn"
}
}
getBackToBook(){
  this.ticketOn = false
  this.isBook = true;
}
// getTrip():Destination[]{
//   return this.trips
// }
receiveNumber($event: number): void {
  this.selectDes = $event
  this.selectTrip = this.idTrip!
}
receiveReceipt($event: string) : void{
  this.receiptNew = $event
}


//nqd1111 start
saveCustomer() : void{
  const name = this.firstFormGroup2.get('nameCtrl')?.value;
  const phone = this.phoneCtrl.value;
  const address = this.firstFormGroup2.get('addressCtrl')?.value;
  const address2 = this.firstFormGroup2.get('address2Ctrl')?.value;
  let addressList : Address[] = [];
  this.client ={
  
    customer_name : name!,
    customer_phone: phone!,
    address: "Đón: " + address! + " Xuống: "+ address2, 
  };
  this.clientService.addClient(this.client).subscribe((response : any)=>{
     let id = JSON.parse(response);
    if(id == null){
     id = this.client.id
    }
    addressList=this.getAddress(address,address2,id.id)
    this.addressService.addClientAddress(addressList).subscribe((data)=>{
     return response
 });
  },
  (error)=>{
    return error
  }) 
}
getAddress(a:any,b:any,c:any):Address[]{
  let list: Array<Address> = [];
  let address:Address={
    name : a,
    longitude : "",
    latitude : " ",
    passanger_id : c
  }
  let address2:Address={
    name : b,
    longitude : "",
    latitude : "",
    passanger_id : c
  }
  list.push(address)
  list.push(address2)
  return list;
}
autoFill(phone:string){
  this.clientService.getClientByPhone(phone).subscribe((data : any)=>{
    this.client = data[0]
    this.firstFormGroup2.get('nameCtrl')?.setValue(data[0].name)
    return data
  })
}
getFieldFil(data:any){
  this.firstFormGroup2.get('nameCtrl')?.setValue(data[0].name)
  this.firstFormGroup2.get('addressCtrl')?.setValue("");
   this.firstFormGroup2.get('address2Ctrl')?.setValue("");;    
}

receiveEvent($event:Seat[]){
  //console.log($event)
  this.showSeatList = $event
}

confirmJourney(){
  let seats=[];
  let seatNum=[]

  seats= this.showSeatList.map(iteam=>{   
  
  return iteam.id 
});
seatNum= this.showSeatList.map(iteam=>{   
  //console.log(iteam.name_slot )
  return iteam.name_slot 
});
if(seats.length == 0){
  window.alert("Bạn chưa chọn vé")
  }else{
  window.alert("Bạn đã đặt thành công vé: "+ seatNum  );
  for (let index = 0; index < seatNum.length; index++) {
    const element = seatNum[index];
    this.changeColorBookTicket(element)  
  }
  }
  this.createReceipt(seats);
  this.search = true;
}

changeColorBookTicket(key:any){
  let id = document.getElementById(key) 
   id?.classList.add('booked')

}

createReceipt(seat: Array<string>){
  const name = this.firstFormGroup2.get('nameCtrl')?.value;
  const phone = this.phoneCtrl.value;
  const address1 = this.firstFormGroup2.get('addressCtrl')?.value;
  const address2 = this.firstFormGroup2.get('address2Ctrl')?.value;
  this.client ={
    customer_name : name!,
    customer_phone: phone!,
    address: "Đón: " + address1! + " Xuống: "+ address2, 
  };

  let customer_name =this.client.customer_name;
  let customer_phone=  this.client.customer_phone;
  let address = this.client.address;
  let num_ticket = seat.length;
  let trip_id = this.trip.id
  let sloots  =  seat
    
  
   this.ticketService.addTicket(customer_name,customer_phone,address,num_ticket,trip_id,sloots).subscribe(
    (response:any) => {  
      this.idTicket = response
      this.bookEvent(this.idTicket.replace("\"", "").trim());
    },
    (error) => {
      console.error('Error:', error);
      // Handle the error here
    }
  );
}

bookEvent(id:any):void{
  this.confirmEvent.emit(id.replace("\"", "").trim());
}


back(){
  this.search = true;
}
//nqd1111 end


}
