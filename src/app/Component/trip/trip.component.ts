import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core'
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';
import { PeriodicElement } from 'src/app/Model/PeriodicElement';
import { Trip } from 'src/app/Model/trip';
import { DatePipe } from '@angular/common';
import { AppService } from 'src/app/app.service';
import { TimeService } from 'src/app/Service/time.service';
import { TimeTrip } from 'src/app/Model/time';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgSwitch, NgSwitchCase, AsyncPipe} from '@angular/common';
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
  displayedColumns = ['name', 'timetrip', 'timeend', 'type', 'finish'];
  dataSource = ELEMENT_DATA1;
  

  @ViewChild('stickyHeaderRow') stickyHeaderRow!: ElementRef;
  constructor(public appService: AppService, 
    private renderer2: Renderer2, 
    private timeService: TimeService,
    private _formBuilder: FormBuilder) {
    this.format();
    this.setStickyHeader(true);
    this.getTime();
  }

  
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

    for (let i = 0; i < ELEMENT_DATA1?.length; i++) {
      const startTime = new Date(
        `${ELEMENT_DATA1?.[i].timetrip.start_day}T${ELEMENT_DATA1?.[i].timetrip.start_time}`
      );
      const currentDateTime = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        currentTime.getHours(),
        currentTime.getMinutes(),
        currentTime.getSeconds()
      );

      if (currentDateTime > startTime && ELEMENT_DATA1?.[i].finished == false) {
        this.status[i] = 'Xe đang trong hành trình';
      } else if (
        currentDateTime > startTime ||
        ELEMENT_DATA1?.[i].finished == true
      ) {
        this.status[i] = 'Xe đã hoàn thành chuyến';
      } else if (
        currentDateTime < startTime &&
        ELEMENT_DATA1?.[i].finished == false
      ) {
        this.status[i] = 'Xe chưa bắt đầu chuyến';
      }
    }
  }
  handleAddTrip() {
    this.isAdd = true;
    this.isSticky = false;
  }

  handleClose() {
    this.isAdd = false;
    this.isSticky = true;
  }
}

const ELEMENT_DATA1: Trip[] = [
  {
    id: '1af97fd2-8391-459f-a1d3-1ae4d89b8d77',
    name: 'Sài Gòn đi Bình Định',
    timetrip: {
      id: 5,
      start_time: '07:00:00',
      end_time: '13:00:00',
      start_day: '2023-12-15',
      end_day: '2023-12-15',
    },
    type: {
      id: 'samco',
      name: 'samco ghế ngồi',
      maxslot: 27,
      numbers_floor: 1,
      convenients: 'Máy lạnh, giường, quá tốt',
    },
    finished: false,
  },
  {
    id: '1af97fd2-8391-459f-a1d3-1ae4d89b8d77',
    name: 'Sài Gòn đi Bến Tre',
    timetrip: {
      id: 5,
      start_time: '07:00:00',
      end_time: '10:00:00',
      start_day: new Date('2023-02-20'),
      end_day: new Date('2023-02-20'),
    },
    type: {
      id: 'thaco',
      name: 'Thaco Mobile Home Luxury',
      maxslot: 32,
      numbers_floor: 0,
      convenients:
        'Có 2 nhà vệ sinh, nội thất sang trọng, xe được trang bị wifi miễn phí có khăn lạnh cho quý khách',
    },
    finished: true,
  },
  {
    id: '1af97fd2-8391-459f-a1d3-1ae4d89b8d77',
    name: 'Sài Gòn đi Bến Tre',
    timetrip: {
      id: 5,
      start_time: '07:00:00',
      end_time: '10:00:00',
      start_day: new Date('2023-02-20'),
      end_day: new Date('2023-02-20'),
    },
    type: {
      id: 'thaco',
      name: 'Thaco Mobile Home Luxury',
      maxslot: 32,
      numbers_floor: 0,
      convenients:
        'Có 2 nhà vệ sinh, nội thất sang trọng, xe được trang bị wifi miễn phí có khăn lạnh cho quý khách',
    },
    finished: true,
  },
  {
    id: '1af97fd2-8391-459f-a1d3-1ae4d89b8d77',
    name: 'Sài Gòn đi Bến Tre',
    timetrip: {
      id: 5,
      start_time: '07:00:00',
      end_time: '10:00:00',
      start_day: new Date('2023-02-20'),
      end_day: new Date('2023-02-20'),
    },
    type: {
      id: 'thaco',
      name: 'Thaco Mobile Home Luxury',
      maxslot: 32,
      numbers_floor: 0,
      convenients:
        'Có 2 nhà vệ sinh, nội thất sang trọng, xe được trang bị wifi miễn phí có khăn lạnh cho quý khách',
    },
    finished: true,
  },
  {
    id: '1af97fd2-8391-459f-a1d3-1ae4d89b8d77',
    name: 'Sài Gòn đi Bến Tre',
    timetrip: {
      id: 5,
      start_time: '07:00:00',
      end_time: '10:00:00',
      start_day: new Date('2023-02-20'),
      end_day: new Date('2023-02-20'),
    },
    type: {
      id: 'thaco',
      name: 'Thaco Mobile Home Luxury',
      maxslot: 32,
      numbers_floor: 0,
      convenients:
        'Có 2 nhà vệ sinh, nội thất sang trọng, xe được trang bị wifi miễn phí có khăn lạnh cho quý khách',
    },
    finished: true,
  },
  {
    id: '1af97fd2-8391-459f-a1d3-1ae4d89b8d77',
    name: 'Sài Gòn đi Bến Tre',
    timetrip: {
      id: 5,
      start_time: '07:00:00',
      end_time: '10:00:00',
      start_day: new Date('2023-02-20'),
      end_day: new Date('2023-02-20'),
    },
    type: {
      id: 'thaco',
      name: 'Thaco Mobile Home Luxury',
      maxslot: 32,
      numbers_floor: 0,
      convenients:
        'Có 2 nhà vệ sinh, nội thất sang trọng, xe được trang bị wifi miễn phí có khăn lạnh cho quý khách',
    },
    finished: true,
  },
  {
    id: '1af97fd2-8391-459f-a1d3-1ae4d89b8d77',
    name: 'Sài Gòn đi Bến Tre',
    timetrip: {
      id: 5,
      start_time: '07:00:00',
      end_time: '10:00:00',
      start_day: new Date('2023-02-20'),
      end_day: new Date('2023-02-20'),
    },
    type: {
      id: 'thaco',
      name: 'Thaco Mobile Home Luxury',
      maxslot: 32,
      numbers_floor: 0,
      convenients:
        'Có 2 nhà vệ sinh, nội thất sang trọng, xe được trang bị wifi miễn phí có khăn lạnh cho quý khách',
    },
    finished: true,
  },
];
