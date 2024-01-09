import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  displayedColumns = ['name', 'number', 'maxslot', 'numbers_floor','convenients'];
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
    nameFormControl = new FormControl('',[
      Validators.required, 
    ]);
    numberPlateFormControl = new FormControl('',[
      Validators.required, 
      Validators.minLength(10),
    ]);
    numberSeatFormControl = new FormControl('',[
      Validators.required, 
      Validators.min(25),
    ]);
    featureFormControll = new FormControl('',[
      Validators.required, 
      Validators.max(3),
    ]);
    myForm = new FormGroup({
      name: this.nameFormControl,
      number_plate: this.numberPlateFormControl,
      number_seat: this.numberSeatFormControl,
      fearture: this.featureFormControll,
    })
  handleAddBusType(){
    this.isAdd = true;
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
  handleClose(){
    this.isAdd = false;
  }
  handleAdd(name: any, number: any, seat: any, floor: any, feature: any){
      this.busTypeService.addType(name.value, seat.value, floor.value, number.value, feature.value).subscribe((data: any)=>{
        if(data == 'OK'){
          this.toast.success({detail:"Thành công",summary:'Đã thêm vào một chiếc xe mới', position:'topRight'});
          this.init();
          this.isAdd = false;
        }
      })
  }
}
