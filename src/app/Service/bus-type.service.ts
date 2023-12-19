import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class BusTypeService {
  url ='';
  constructor(private http: HttpClient, private appService: AppService) { }
  getType(){
    this.url = this.appService.getUrlBusType();
    return this.http.get(`${this.url}`).pipe();
  }
  addType(name: any, maxslot: any, numbers_floor: number, number_plate: any, convenients: any){
      let obj = { name, maxslot, numbers_floor, number_plate, convenients};
      return this.http.post(`${this.url}`, obj, {
        headers: {'Content-Type': 'application/json'},
        responseType: 'text',
      }).pipe();
  }
}
