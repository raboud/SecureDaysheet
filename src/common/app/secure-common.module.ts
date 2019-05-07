import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { LoginComponent } from './Components/login/login.component';
import { NavigationComponent } from './Components/Navigation/navigation.component';

import { AuthService, AuthMockService } from './Services/auth.service';
import { ConfigurationService } from './Services/configuration.service';
import { StorageService } from './Services/storage.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ],
  exports: [
    LoginComponent,
    NavigationComponent,
    FontAwesomeModule
  ],
  providers: [
    { provide: AuthService, useClass: AuthMockService},
    ConfigurationService,
    StorageService,
  ]
})
export class SecureCommonModule { }
