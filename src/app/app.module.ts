import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// external modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';

//components
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { EventsListPageComponent } from './events-list-page/events-list-page.component';
import { SummaryTabComponent } from './summary-tab/summary-tab.component';
import { ListTabComponent } from './list-tab/list-tab.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    EventsListPageComponent,
    SummaryTabComponent,
    ListTabComponent,
    DateRangePickerComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
