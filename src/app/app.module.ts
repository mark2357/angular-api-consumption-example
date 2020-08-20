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
import { SummeryTabComponent } from './summery-tab/summery-tab.component';
import { ListTabComponent } from './list-tab/list-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    EventsListPageComponent,
    SummeryTabComponent,
    ListTabComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
