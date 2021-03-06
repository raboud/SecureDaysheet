import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './Components/login/login.component';
import { NavigationComponent } from './Components/Navigation/navigation.component';

import { AuthService, AuthMockService } from './Services/auth.service';
import { ConfigurationService } from './Services/configuration.service';
import { StorageService } from './Services/storage.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ],
  exports: [
    LoginComponent,
    NavigationComponent,
    FontAwesomeModule,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: AuthService, useClass: AuthMockService},
    ConfigurationService,
    StorageService,
  ]
})
export class SecureCommonModule { }
