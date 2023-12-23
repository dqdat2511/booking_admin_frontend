import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import { Client } from 'src/app/Model/Client';
import { ClientService } from 'src/app/Service/Client.service';
import { TripService } from 'src/app/Service/trip.service';
import { AppService } from 'src/app/app.service';
import { Trip } from 'src/app/Model/trip';
import { BusTypeService } from 'src/app/Service/bus-type.service';
import { BusType } from 'src/app/Model/BusType';
import { TimeTrip } from 'src/app/Model/time';
import { TimeService } from 'src/app/Service/time.service';
import { Ticket } from 'src/app/Model/Ticket';

@Component({ 
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent { 
  idChoose: boolean = false;
  search:boolean = false;
  client!:Client;
  uniqueTrips: Trip[] = [];
  tripInfo2: Trip[] = [] ;
  timeTrip:TimeTrip[] = []
  typeBus: BusType[]=[]
  receiptNew!: string;
  key : string =''
  idTrip?: number;
  trip!: Trip;
  ticketOn:boolean = false;
  clientService = new ClientService()
  isBook: boolean = false;
  message: string = "";
  
 firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    phoneCtrl: ['', Validators.required],
    addressCtrl: ['', Validators.required],
    address2Ctrl: ['', Validators.required],
  });
  
  secondFormGroup = this._formBuilder.group({
    tripCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    
  });
  
  isLinear = false;
  constructor(public appService: AppService, 
    private tripService: TripService, 
    private _formBuilder: FormBuilder,
    private typeService: BusTypeService,
    private time:TimeService) {
    this.init();
  }

  selectTrip :any ;
  selectDes = 0;
  onSelected(value:any): void {
    // this.trips = new TripModel().getPlace(value);
    // this.idTrip = value;
    let tripInfo: Trip[] = []
    this.tripService.getTrip().subscribe((data : any)=>{
      tripInfo = data;
      this.tripInfo2 = tripInfo.filter(data => data.name === value);   
    })
	}
 
  onSelectedPlace(value:any): void {	
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
  getBackToTrip(){
    this.isBook = false;
  }
  isNextStep(){
    this.isBook = true;
  }
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
  // getUniqueTrips(trips: Destination[]):  Destination[]{
  //   const uniqueTripsSet = new Set<string>();
  //   const uniqueTrips: Destination[] = [];
  
  //   trips.forEach(trip => {
  //     if (!uniqueTripsSet.has(trip.key)) {
  //       uniqueTripsSet.add(trip.key);
  //       uniqueTrips.push(trip);
  //     }
  //   });
  //   return uniqueTrips;
  // }
 
  saveCustomer() : void{
    const name = this.firstFormGroup.get('nameCtrl')?.value;
    const phone = this.firstFormGroup.get('phoneCtrl')?.value;
    const address = this.firstFormGroup.get('addressCtrl')?.value;
    const address2 = this.firstFormGroup.get('address2Ctrl')?.value;
    this.client ={
      customer_name : name!,
      customer_phone:phone!,
      address: "Đón: " + address! + " Xuống: "+ address2,
      
    };
    this.clientService.addClient(this.client)
  }
}
