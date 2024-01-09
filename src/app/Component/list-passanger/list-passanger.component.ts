import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Trip } from 'src/app/Model/trip';
import { CheckValidResponse } from 'src/app/Response/check-valid-response';
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
  validResponse: CheckValidResponse | undefined;
  dataSource: CdkTableDataSourceInput<Trip> | null = null;
  displayedColumns = ['name', 'timetrip', 'timeend', 'type', 'download'];
  
  constructor(public appService: AppService,
    private renderer2: Renderer2,
    @Inject(TripService) private tripService: TripService,
    private toast: NgToastService ){
      this.init();
  }
  init(){
    this.tripService.getTripToReady().subscribe((data: any) =>{

      this.tripList = data;
      this.dataSource = [];
      if(this.tripList)
      this.dataSource = this.tripList;
    })    
  }
  handleDownload(index: string){
    this.tripService.checkValid(index).subscribe((data: CheckValidResponse) => {
      if(data.status == true){
        alert(data.message)
        var linkElement = document.getElementById("href");
        if (linkElement) {
            linkElement.click();
        } else {
            console.error("Không tìm thấy phần tử có id là 'href'");
        }
        return;
      }
      else{
        this.appService.notifyError("Đã có lỗi","Danh sách hành khách hiện tại thì đang thiếu");
        return;
      }
    })
  }
}
