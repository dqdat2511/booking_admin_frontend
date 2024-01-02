import { Component, ElementRef, Input, ViewChild,OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { SeatService } from 'src/app/Service/seat.service';
import { Ticket2 } from '../receipt/receipt.component';
import jsPDF from 'jspdf';
import { Seat } from 'src/app/Model/Seat';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import html2canvas from 'html2canvas';
import { TripService } from 'src/app/Service/trip.service';
import { Trip } from 'src/app/Model/trip';

@Component({
  selector: 'app-trip-ticket-table',
  templateUrl: './trip-ticket-table.component.html',
  styleUrls: ['./trip-ticket-table.component.scss']
})
export class TripTicketTableComponent implements OnInit  {
  @Input() tripId!:string
  trip!:Trip
  BusName!:string;
  length= 0;
  seatNo!:Seat[]
  ticket!: Ticket2[]
  @ViewChild('content', {static:false})el!: ElementRef
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 24; // Set an initial page size
  pagedSeatNo: Seat[] = [];
  constructor(public appService: AppService, 
    private seatService: SeatService,
    private tripService: TripService) {
  }
  
  ngOnInit() {
    this.getData();
  }
  getData(){
    this.seatService.getSeatListByTripID(this.tripId).subscribe((data=>{
      this.ticket = data 
    }))
    this.seatService.getSeatByTripID(this.tripId).subscribe((data :any)=>{
      this.seatNo = data   
      this.length=this.seatNo.length
      this.initializePaginator();
    })
   this.tripService.getTripById(this.tripId).subscribe((data: any)=>{
    if(data){
      this.trip = data
    }
   })
  }

  mappingData(key:any):Ticket2{
  try {
    let bookTicket: Ticket2 | undefined;
    
    this.ticket.forEach(ticket => {
      if (ticket.seat.includes(key)) {
        bookTicket = ticket;
      }
    });
    if (bookTicket !== undefined) {
      return bookTicket;
    } else {
      throw new Error(`Ticket not found for seat: ${key}`);
    }
  } catch (error) {
    throw error
  }
    
  }
 
  async printList() {
    this.paginator.firstPage();
    const content = this.el.nativeElement;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 200; // Chiều rộng của tài liệu PDF (A4)
    const addPageToPdf = async () => {
      this.paginator.nextPage();
      const currentPageCanvas = await html2canvas(content);
      const currentPageImgData = currentPageCanvas.toDataURL('image/png');
      pdf.addImage(currentPageImgData, 'PNG', 1, 1, imgWidth, (currentPageCanvas.height * imgWidth) / currentPageCanvas.width);
    };
      const firstPageCanvas = await html2canvas(content);
      const firstPageImgData = firstPageCanvas.toDataURL('image/png');
      pdf.addImage(firstPageImgData, 'PNG', 1, 1, imgWidth, (firstPageCanvas.height * imgWidth) / firstPageCanvas.width);
    for (let i = 1; i < this.paginator.getNumberOfPages(); i++) {
      await addPageToPdf();
      pdf.addPage();
      const currentPageCanvas = await html2canvas(content);
      const currentPageImgData = currentPageCanvas.toDataURL('image/png');
      pdf.addImage(currentPageImgData, 'PNG', 1, 1, imgWidth, (currentPageCanvas.height * imgWidth) / currentPageCanvas.width);
    }
    if (this.paginator.pageIndex + 1 === this.paginator.getNumberOfPages()) {
      pdf.autoPrint({variant: 'non-conform'})
      pdf.save(this.ticket[0].name_trip +'.pdf');
    }
  }
  initializePaginator() {
    if (this.paginator) {
      this.paginator.firstPage(); 
      this.handlePage({
        pageIndex: 0,
        pageSize: this.pageSize,
        length: this.seatNo.length,
      } as PageEvent);
    }
  }
   handlePage(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedSeatNo = this.seatNo.slice(startIndex, endIndex);
  }
}
