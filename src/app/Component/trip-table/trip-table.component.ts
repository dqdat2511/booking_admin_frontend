import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';




@Component({
  selector: 'app-trip-table',
  templateUrl: './trip-table.component.html',
  styleUrls: ['./trip-table.component.scss']
})

export class TripTableComponent {
  @Output() chooseEvent = new EventEmitter<number>();
  defaultNum! :number ;
  displayedColumns: string[] = ['destination', 'start_time','selected'];

  ngOnInit() {
    // Kiểm tra xem tripTime có giá trị không trước khi sử dụng
    // if (this.tripTime && this.tripTime.length > 0) {
    //   this.defaultNum = this.tripTime[0].id;
    // }
  }

  tickOption(value: number) : void{ 
   this.chooseEvent.emit(value);
  }
}
