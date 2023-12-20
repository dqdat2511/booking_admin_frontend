import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Receipt } from 'src/app/TripTest/Receipt';
import { TripModel, Destination } from 'src/app/TripTest/TripModel';

@Component({ 
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent { 
  idChoose: boolean = false;
  search:boolean = false;
  tripInfo: TripModel[] = []
  trips : Destination[] = []
  receiptNew: Receipt[] = []
  key : string =''
  idTrip?: number;
 firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    phoneCtrl: ['', Validators.required],
    addressCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    tripCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    
  });
  tripModel = new TripModel().getAllTrips();
  
  isLinear = false;
  constructor(private _formBuilder: FormBuilder) {}


  selectTrip = 0;
  selectDes = 0;
  onSelected(value:number): void {
    
    this.trips = new TripModel().getPlace(value);
    this.idTrip = value;
	}
  onSelectedPlace(value:string): void {		
     this.key = value;
	}
  searchTrip(){
      this.trips = new TripModel().getDes(this.idTrip!,this.key);
      this.search = true;    
  }
  getTrip():Destination[]{
    return this.trips
  }
  receiveNumber($event: number): void {
    this.selectDes = $event
    this.selectTrip = this.idTrip!
  }
  receiveReceipt($event: Receipt[]) : void{
    this.receiptNew = $event
  }
}
