import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from 'src/common/app/Services/auth.guard';
import { LoginComponent } from 'src/common/app/Components/login/login.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: 'daysheet', loadChildren: './Modules/Daysheet/daysheet.module#DaysheetModule' },
      { path: 'messages', loadChildren: './Modules/Messages/messages.module#MessagesModule' },
      { path: 'patients', loadChildren: './Modules/Patients/patients.module#PatientsModule' },
      { path: 'providers', loadChildren: './Modules/Providers/providers.module#ProvidersModule' },
      { path: 'reports', loadChildren: './Modules/Reports/reports.module#ReportsModule' },
      { path: 'settings', loadChildren: './Modules/Settings/settings.module#SettingsModule' },
      { path: 'dashboard', component: DashboardComponent },
    ]},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
