import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from './Modules/Shared/shared.module';

import { ApiService, ApiMock } from './Services/api.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HomeComponent } from './Components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
