import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { Address } from '../Model/Address';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  url ='';
  private address! : Address;
  constructor(private http: HttpClient, private appService: AppService) {
    this.url = this.appService.getUrlAddress();
   }
  addClientAddress(address: Address[]): Observable<any> {
    const body = JSON.stringify(address).replace('[','').replace(']','');
    
    return this.http.post(`${this.url}`, body, {
      headers: {'Content-Type': 'application/json'},
      responseType: 'text',
    }).pipe(
      catchError(error => {
        console.error('API Request Error:', error);
        throw error; // Rethrow the error for further handling
      })
    );
  }
}
