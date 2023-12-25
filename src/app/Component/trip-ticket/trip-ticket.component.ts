import { Component, Input } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {map} from 'rxjs/operators';
import { Trip } from 'src/app/Model/trip';
import { AppService } from 'src/app/app.service';
import { TripService } from 'src/app/Service/trip.service';
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
  firstFormGroup = this._formBuilder.group({
    tripCtrl: ['', Validators.required],
  });

  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver,public appService: AppService, 
    private tripService: TripService,) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
      this.init();
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
}
