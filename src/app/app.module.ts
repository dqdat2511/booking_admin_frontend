import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Component/home-page/home-page.component';
import { TimeTripComponent } from './Component/time-trip/time-trip.component';
import { SeatTripComponent } from './Component/seat-trip/seat-trip.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepperComponent } from './Component/stepper/stepper.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { TripTableComponent } from './Component/trip-table/trip-table.component';
import {MatRadioModule} from '@angular/material/radio';
import { ReceiptComponent } from './Component/receipt/receipt.component';
import { MatSortModule} from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TimeTripComponent,
    SeatTripComponent,
    StepperComponent,
    TripTableComponent,
    ReceiptComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatRadioModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
