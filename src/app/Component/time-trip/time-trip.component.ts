import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { NgxMaterialTimepicker12HoursFaceComponent } from 'ngx-material-timepicker/src/app/material-timepicker/components/timepicker-12-hours-face/ngx-material-timepicker-12-hours-face.component';
import { TimeService } from 'src/app/Service/time.service';
import { AppService } from 'src/app/app.service';
import { TimeTrip } from 'src/app/Model/time';
import { ToastrService } from 'ngx-toastr';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-time-trip',
  templateUrl: './time-trip.component.html',
  styleUrls: ['./time-trip.component.scss'],
})
export class TimeTripComponent {
  isAdd: boolean = false;
  selectedDate: any;
  startTime: any | null = '3:00 AM';
  endTime: any | null = '3:00 PM';
  timetrip: TimeTrip[] | null = null;
  error: string | null = null;
  constructor(
    private datePipe: DatePipe,
    private appService: AppService,
    private toast: NgToastService,
    @Inject(TimeService) private timeService: TimeService
  ) {
    this.isAdd = false;
    this.Init();
  }
  myFilter = (d: Date | null): boolean => {
    const currentDate = new Date();
    const selectedDate = d || new Date();

    // Nếu ngày đầu vào là null, hoặc lớn hơn hoặc bằng ngày hiện tại, cho phép chọn
    return (
      selectedDate.toDateString() === currentDate.toDateString() ||
      selectedDate >= currentDate
    );
  };
  handleAddTime() {
    this.isAdd = true;
  }

  handleClose() {
    this.isAdd = false;
  }
  onDateInput(event: any) {
    const enteredDate = event.target.value;
    if (!this.isValidDateFormat(enteredDate)) {
      console.log(1);
      this.error = 'Định dạng ngày không hợp lệ. Vui lòng sử dụng định dạng dd/mm/yyyy.';
    } else {
      this.error = null;
    }
  }
  isValidDateFormat(dateString: string): boolean {
    // Kiểm tra định dạng dd/mm/yyyy
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(dateString);
  }
  addTime(startDay: any, endDay: any) {
    console.log(this.formatDate(startDay.value));
    this.timeService
      .addTime(
        this.formatDate(startDay.value),
        this.convertTime(this.startTime),
        this.formatDate(endDay.value),
        this.convertTime(this.endTime)
      )
      .subscribe((data) => {
        console.log(data);
        this.toast.success({detail:"Đã tạo bảng tài mới",summary:'Bạn vừa bổ sung thêm bảng tài',duration:5000, position:'topRight'});
        this.handleClose();
        this.Init();
        
      });
  }
  convertTime(time: any) {
    const [rawHour, minute, period] = time.split(/[:\s]/);
    let hour = parseInt(rawHour, 10);
    if (period.toUpperCase() === 'PM' && hour !== 12) {
      hour += 12;
    }
    if (period.toUpperCase() === 'PM' && hour == 12) {
      hour -= 12;
    }
    const time24 = `${hour.toString().padStart(2, '0')}:${minute.padStart(
      2,
      '0'
    )}:00`;
    return time24;
  }
  formatDate(date: string): string {
    const [day, month, year] = date.split('/');
    const dateConverted = `${year.toString().padStart(4)}-${month
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return dateConverted;
  }
  formatDateVietNam(date: Date | null): any {
    return date ? this.datePipe.transform(date, 'dd/MM/yyyy') : '';
  }
  Init() {
    this.startTime = '3:00 AM';
    this.endTime = '3:00 PM';
    
    this.timeService.getTime().subscribe((data: any) => {
        this.timetrip = data;

    },
    (error) =>{
        console.log(error);
    }
    );
  }
}
