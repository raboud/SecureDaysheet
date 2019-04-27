import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { PatientsComponent } from './Components/patients/patients.component';

import { AuthService } from './Services/auth.service';
import { ApiService } from './Services/api.service';
import { ConfigurationService } from './Services/configuration.service';
import { StorageService } from './Services/storage.service';
import { MessageStatusComponent } from './Components/message-status/message-status.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    PatientsComponent,
    MessageStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
//    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthService,
    ApiService,
    ConfigurationService,
    StorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
