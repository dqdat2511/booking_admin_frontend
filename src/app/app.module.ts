import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {  MatFormFieldModule } from '@angular/material/form-field';
import {  MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Component/home-page/home-page.component';
import { TimeTripComponent } from './Component/time-trip/time-trip.component';
import { DatePipe } from '@angular/common';
import { NgxMaterialTimepicker24HoursFaceComponent } from 'ngx-material-timepicker/src/app/material-timepicker/components/timepicker-24-hours-face/ngx-material-timepicker-24-hours-face.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FormsModule } from '@angular/forms'; 
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgToastModule } from 'ng-angular-popup';

import { NgToastService } from 'ng-angular-popup';
import { TripComponent } from './Component/trip/trip.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TimeTripComponent,
    TripComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatCardModule,
    NgxMaterialTimepickerModule,
    FormsModule,
    NgToastModule,
    ToastrModule.forRoot({            
    positionClass: 'toast-top-right',
    easing: 'ease-in',
    easeTime: 300,
    progressBar: true,
    progressAnimation: 'increasing',
    includeTitleDuplicates: true,
    preventDuplicates: false,
    timeOut: 10000}
    ),

  ],
  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' },
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
