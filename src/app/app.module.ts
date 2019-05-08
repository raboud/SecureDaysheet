import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

import { ApiService, ApiMock } from './Services/api.service';
import { HomeComponent } from './Components/home/home.component';
import { SecureCommonModule } from 'src/common/app/secure-common.module';
import { SharedModule } from './Modules/Shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    { provide: ApiService, useClass: ApiMock},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
