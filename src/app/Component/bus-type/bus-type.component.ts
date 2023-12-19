import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { BusType } from 'src/app/Model/BusType';
import { BusTypeService } from 'src/app/Service/bus-type.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-bus-type',
  templateUrl: './bus-type.component.html',
  styleUrls: ['./bus-type.component.scss']
})
export class BusTypeComponent {
  isAdd: boolean = false;
  iSticky = false;
  typeBus: BusType[]|null = [];
  displayedColumns = ['name', 'maxslot', 'numbers_floor','convenients'];
  dataSource: CdkTableDataSourceInput<BusType> | null = null;
  
  @ViewChild('stickyHeaderRow') stickyHeaderRow!: ElementRef;
  constructor(private appService: AppService,
    private renderer2: Renderer2,
    private formBuilder: FormBuilder,
    private busTypeService: BusTypeService,
    private toast: NgToastService){
      this.setStickyHeader(true);
      this.init();
    }
  handleAddBusType(){

  }
  init(){
    this.busTypeService.getType().subscribe((data: any) =>{
        this.dataSource = data;
    })
  }
  setStickyHeader(properties: boolean) {
    if (this.stickyHeaderRow) {
      const nativeElement = this.stickyHeaderRow.nativeElement;
      this.renderer2.setProperty(nativeElement, 'sticky', true);
    }
  }
}
