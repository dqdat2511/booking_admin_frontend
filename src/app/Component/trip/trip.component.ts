import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core'
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';
import { PeriodicElement } from 'src/app/Model/PeriodicElement';
import { Trip } from 'src/app/Model/trip';
import { DatePipe } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { TimeService } from 'src/app/Service/time.service';
import { TimeTrip } from 'src/app/Model/time';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgSwitch, NgSwitchCase, AsyncPipe} from '@angular/common';
import { BusType } from 'src/app/Model/BusType';
import { BusTypeService } from 'src/app/Service/bus-type.service';
import { TripService } from 'src/app/Service/trip.service';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent {
  isAdd: boolean = false;
  isSticky = false;
  status: any[] | null = [];
  timeArray: TimeTrip[] | null = [];
  typeBus: BusType[] | null = [];
  tripList: Trip[] | null = [];
  displayedColumns = ['name', 'timetrip', 'timeend', 'type', 'finish'];
  dataSource: CdkTableDataSourceInput<Trip> | null = null;
  

  @ViewChild('stickyHeaderRow') stickyHeaderRow!: ElementRef;
  constructor(public appService: AppService, 
    private renderer2: Renderer2, 
    private timeService: TimeService,
    private _formBuilder: FormBuilder,
    private typeService: BusTypeService,
    @Inject(TripService) private tripService: TripService,
    private toast: NgToastService) {
    // this.format();
    this.setStickyHeader(true);
    this.getTime();
    this.init();

  }

  nameFormControl = new FormControl('',[
    Validators.required, 
    Validators.minLength(10)
  ]);
  tripForm = new FormGroup({
    name: this.nameFormControl,

  })
  getTime(){
    this.timeService.getTime().subscribe((data: any) => {
      this.timeArray = data;
    });
  }
  setStickyHeader(properties: boolean) {
    if (this.stickyHeaderRow) {
      const nativeElement = this.stickyHeaderRow.nativeElement;
      this.renderer2.setProperty(nativeElement, 'sticky', true);
    }
  }
  format() {
    const currentTime = new Date();
    this.status = []; // Đặt lại mảng status trước khi cập nhật
    if(this.tripList == null){
      alert(1);
      return ;
    }
    for (let i = 0; i < this.tripList.length; i++) {
      const startTime = new Date(
        `${this.tripList?.[i].time.start_day}T${this.tripList?.[i].time.start_time}`
      );
      const currentDateTime = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        currentTime.getHours(),
        currentTime.getMinutes(),
        currentTime.getSeconds()
      );

      if (currentDateTime > startTime && this.tripList?.[i].finished == false) {
        this.status[i] = 'Xe đang trong hành trình';
      } else if (
        currentDateTime > startTime ||
        this.tripList?.[i].finished == true
      ) {
        this.status[i] = 'Xe đã hoàn thành chuyến';
      } else if (
        currentDateTime < startTime &&
        this.tripList?.[i].finished == false
      ) {
        this.status[i] = 'Xe chưa bắt đầu chuyến';
      }
    }
    console.log(this.status);
  }
  handleAddTrip() {
    this.isAdd = true;
    this.isSticky = false;
    this.init();


  }

  handleClose() {
    this.isAdd = false;
    this.isSticky = true;
  }
  init(){
    this.tripService.getTrip().subscribe((data: any) =>{

      this.tripList = data;
      this.dataSource = [];
      if(this.tripList)
      this.dataSource = this.tripList;
      console.log(data);   
      this.format();
    })
    this.typeService.getType().subscribe((data: any) =>{
      this.typeBus = data;
      
    })
   
    if(this.tripList){
      this.dataSource = this.tripList;
    }
  }
  handleAdd(name: any, time: any, type: any){
      console.log(name.value, time.value,  type.value);
      this.tripService.addTrip(name.value, time.value, type.value).subscribe((data: any) =>{
        if(data == 'OK'){
          this.toast.success({detail:"Đã tạo một chuyến xe mới",summary:'Đã tạo chuyến thành công',duration:5000, position:'topRight'});
          this.init();
          this.handleClose();
        }
        console.log(data);
      })
  }
}