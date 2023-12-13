import { Component } from '@angular/core';

@Component({
  selector: 'app-time-trip',
  templateUrl: './time-trip.component.html',
  styleUrls: ['./time-trip.component.scss']
})
export class TimeTripComponent {
  isAdd : boolean = false;
  time = ['15:00:00', '15:00:00', '15:00:00'];
  day = ['20-02-2002', '20-02-2003', '20-02-2004'];
  timetrip: any = [{
    'time':'15:00:00', 
    'day' : '20-02-2002'
  },
{
  'time':'15:00:00', 
  'day' : '20-02-2002'
},
{
  'time':'15:00:00', 
  'day' : '20-02-2002'
}]
constructor(){
  this.isAdd = false;
};
handleAddTime(){
  this.isAdd = true;
}
handleClose(){
  this.isAdd = false;
}
}
