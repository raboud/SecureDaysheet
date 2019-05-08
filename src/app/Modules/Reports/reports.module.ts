import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../Shared/shared.module';

import { AuthGuard } from 'src/common/app/Services/auth.guard';

import { ReportListComponent } from './Components/report-list.component';
import { ReportDetailsComponent } from './Components/report-details.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: '', component: ReportListComponent },
      { path: ':id', component: ReportDetailsComponent },
    ]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ReportListComponent,
    ReportDetailsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ReportsModule { }
