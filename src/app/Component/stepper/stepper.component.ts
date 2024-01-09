import { Component,OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Client } from 'src/app/Model/Client';
import { ClientService } from 'src/app/Service/Client.service';
import { TripService } from 'src/app/Service/trip.service';
import { AppService } from 'src/app/app.service';
import { Trip } from 'src/app/Model/trip';
import { BusType } from 'src/app/Model/BusType';
import { TimeTrip } from 'src/app/Model/time';
import { AddressService } from 'src/app/Service/address.service';
import { Address } from 'src/app/Model/Address';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Ticket } from 'src/app/Model/Ticket';


@Component({ 
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit { 
  idChoose: boolean = false;
  search:boolean = false;
  client!:Client;
  uniqueTrips: Trip[] = [];
  tripInfo2: Trip[] = [] ;
  timeTrip:TimeTrip[] = []
  typeBus: BusType[]=[]
  receiptNew!: Ticket[];
  key : string =''
  idTrip?: number;
  trip!: Trip;
  ticketOn:boolean = false;
  options:string[] =[]
  isBook: boolean = false;
  isOptional = true;
  message: string = "";
  phoneCtrl = new FormControl('');
  filteredOptions!: Observable<string[]>;


 firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required], 
    addressCtrl: ['', Validators.required],
    address2Ctrl: ['', Validators.required],
  });
  
  secondFormGroup = this._formBuilder.group({
    tripCtrl: ['', Validators.required],
    timeCtrl:['',Validators.required]
  });
  thirdFormGroup = this._formBuilder.group({
    seatCtrl:['']
  });
  
  isLinear = false;
  constructor(public appService: AppService, 
    private tripService: TripService, 
    private _formBuilder: FormBuilder,
    private clientService: ClientService,
    private addressService: AddressService) {
    this.init();
    
  }
  ngOnInit(){
    this.getAllPhone();
    this.validation();
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
  selectTrip :any ;
  selectDes = 0;
  onSelected(value:any): void {
    this.secondFormGroup.get('timeCtrl')?.reset();
    let tripInfo: Trip[] = []
    this.tripService.getTrip().subscribe((data : any)=>{
      tripInfo = data;
      this.tripInfo2 = tripInfo.filter(data => data.name === value);   
    })
	}
 
  onSelectedPlace(value:any): void {	
      const selectedTrip = this.tripInfo2.find(trip => trip.id === value);
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
  receiveReceipt($event: Ticket[]) : void{
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

 
  saveCustomer() : void{
    const name = this.firstFormGroup.get('nameCtrl')?.value;
    const phone = this.phoneCtrl.value;
    const address = this.firstFormGroup.get('addressCtrl')?.value;
    const address2 = this.firstFormGroup.get('address2Ctrl')?.value;
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
      this.firstFormGroup.get('nameCtrl')?.setValue(data[0].name)
      return data
    })
  }
  getFieldFil(data:any){
    this.firstFormGroup.get('nameCtrl')?.setValue(data[0].name)
    this.firstFormGroup.get('addressCtrl')?.setValue("");
     this.firstFormGroup.get('address2Ctrl')?.setValue("");;    
  }
  
}
