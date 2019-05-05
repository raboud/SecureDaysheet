import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { PatientListComponent as PatientListComponent } from './Components/patient/patient-list.component';
import { PatientDetailComponent } from './Components/patient/patient-detail.component';
import { ProviderListComponent } from './Components/provider/provider-list.component';
import { ProviderDetailComponent } from './Components/provider/provider-detail.component';
import { DaysheetComponent } from './Components/daysheet/daysheet.component';
import { MessageStatusComponent } from './Components/messages/message-status.component';
import { MessageListComponent } from './Components/messages/message-list.component';
import { MessageDetailComponent } from './Components/messages/message-detail.component';
import { ReportListComponent } from './Components/report/report-list.component';
import { ReportDetailsComponent } from './Components/report/report-details.component';
import { SettingListComponent } from './Components/setting/setting-list.component';
import { SettingDetailsComponent } from './Components/setting/setting-details.component';

import { AuthService, AuthMockService } from './Services/auth.service';
import { ApiService, ApiMock } from './Services/api.service';
import { ConfigurationService } from './Services/configuration.service';
import { StorageService } from './Services/storage.service';
import { HomeComponent } from './Components/home/home.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { APP_BASE_HREF, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { PatientEditComponent } from './Components/patient/patient-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    PatientListComponent,
    MessageStatusComponent,
    PatientDetailComponent,
    ProviderListComponent,
    ProviderDetailComponent,
    MessageListComponent,
    MessageDetailComponent,
    ReportListComponent,
    ReportDetailsComponent,
    SettingListComponent,
    SettingDetailsComponent,
    DaysheetComponent,
    HomeComponent,
    NavigationComponent,
    PatientEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
//    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: AuthService, useClass: AuthMockService},
    { provide: ApiService, useClass: ApiMock},
    ConfigurationService,
    StorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
