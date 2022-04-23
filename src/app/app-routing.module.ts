import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from 'src/common/app/Services/auth.guard';
import { LoginComponent } from 'src/common/app/Components/login/login.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: 'daysheet', loadChildren: () => import('./Modules/Daysheet/daysheet.module').then(m => m.DaysheetModule) },
      { path: 'messages', loadChildren: () => import('./Modules/Messages/messages.module').then(m => m.MessagesModule) },
      { path: 'patients', loadChildren: () => import('./Modules/Patients/patients.module').then(m => m.PatientsModule) },
      { path: 'providers', loadChildren: () => import('./Modules/Providers/providers.module').then(m => m.ProvidersModule) },
      { path: 'reports', loadChildren: () => import('./Modules/Reports/reports.module').then(m => m.ReportsModule) },
      { path: 'settings', loadChildren: () => import('./Modules/Settings/settings.module').then(m => m.SettingsModule) },
      { path: 'dashboard', component: DashboardComponent },
    ]},
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
