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
import { DatePipe, registerLocaleData } from '@angular/common';
import { NgxMaterialTimepicker24HoursFaceComponent } from 'ngx-material-timepicker/src/app/material-timepicker/components/timepicker-24-hours-face/ngx-material-timepicker-24-hours-face.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgToastModule } from 'ng-angular-popup';
import {MatTableModule} from '@angular/material/table';
import { NgToastService } from 'ng-angular-popup';
import { TripComponent } from './Component/trip/trip.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import vi from '@angular/common/locales/vi';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {map} from 'rxjs/operators';
import {NgSwitch, NgSwitchCase, AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {BreakpointObserver} from '@angular/cdk/layout';
registerLocaleData(vi);
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TimeTripComponent,
    TripComponent,
  ],
  imports: [
    NgSwitch,
    NgSwitchCase,
    MatStepperModule,
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
    MatTableModule,
    NgToastModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    MatButtonModule, MatDividerModule,
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
  providers: [DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }, { provide: NZ_I18N, useValue: vi_VN },
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
