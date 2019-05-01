import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { PatientListComponent } from './Components/patient/patient-list.component';
import { PatientDetailComponent } from './Components/patient/patient-detail.component';
import { ProviderListComponent } from './Components/provider/provider-list.component';
import { ProviderDetailComponent } from './Components/provider/provider-detail.component';
import { MessageListComponent } from './Components/messages/message-list.component';
import { MessageDetailComponent } from './Components/messages/message-detail.component';
import { DaysheetComponent } from './Components/daysheet/daysheet.component';
import { ReportListComponent } from './Components/report/report-list.component';
import { ReportDetailsComponent } from './Components/report/report-details.component';
import { SettingListComponent } from './Components/setting/setting-list.component';
import { SettingDetailsComponent } from './Components/setting/setting-details.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthGuard } from './Services/auth.guard';

const routes: Routes = [
  {
    path: '', canActivate:[AuthGuard], children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patients', component: PatientListComponent },
      { path: 'patients/:id', component: PatientDetailComponent },
      { path: 'providers', component: ProviderListComponent },
      { path: 'providers/:id', component: ProviderDetailComponent },
      { path: 'daysheet', component: DaysheetComponent },
      { path: 'messages', component: MessageListComponent },
      { path: 'messages/:id', component: MessageDetailComponent },
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
