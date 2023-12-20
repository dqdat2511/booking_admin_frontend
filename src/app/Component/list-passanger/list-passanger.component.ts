import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Trip } from 'src/app/Model/trip';
import { TripService } from 'src/app/Service/trip.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-list-passanger',
  templateUrl: './list-passanger.component.html',
  styleUrls: ['./list-passanger.component.scss']
})
export class ListPassangerComponent {
[x: string]: any;
  isSticky = false;
  tripList: Trip[] | null = [];
  dataSource: CdkTableDataSourceInput<Trip> | null = null;
  displayedColumns = ['name', 'timetrip', 'timeend', 'type', 'download'];
  
  constructor(public appService: AppService,
    private renderer2: Renderer2,
    @Inject(TripService) private tripService: TripService,
    private toast: NgToastService ){
      this.init();
  }
  init(){
    this.tripService.getTrip().subscribe((data: any) =>{

      this.tripList = data;
      this.dataSource = [];
      if(this.tripList)
      this.dataSource = this.tripList;
    })    
  }
}
