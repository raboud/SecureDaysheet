import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './Services/auth.guard';

import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { DaysheetComponent } from './Components/daysheet/daysheet.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MessageListComponent } from './Components/messages/message-list.component';
import { MessageDetailComponent } from './Components/messages/message-detail.component';
import { PatientListComponent } from './Components/patient/patient-list.component';
import { PatientDetailComponent } from './Components/patient/patient-detail.component';
import { PatientEditComponent } from './Components/patient/patient-edit.component';
import { ProviderListComponent } from './Components/provider/provider-list.component';
import { ProviderDetailComponent } from './Components/provider/provider-detail.component';
import { ReportListComponent } from './Components/report/report-list.component';
import { ReportDetailsComponent } from './Components/report/report-details.component';
import { SettingListComponent } from './Components/setting/setting-list.component';
import { SettingDetailsComponent } from './Components/setting/setting-details.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'daysheet', component: DaysheetComponent },
      { path: 'messages', component: MessageListComponent },
      { path: 'messages/:id', component: MessageDetailComponent },
      { path: 'patients', component: PatientListComponent },
      { path: 'patients/:id', component: PatientDetailComponent },
      { path: 'patients/edit/:id', component: PatientEditComponent },
      { path: 'providers', component: ProviderListComponent },
      { path: 'providers/:id', component: ProviderDetailComponent },
      { path: 'reports', component: ReportListComponent },
      { path: 'reports/:id', component: ReportDetailsComponent },
      { path: 'settings', component: SettingListComponent },
      { path: 'settings/:id', component: SettingDetailsComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
