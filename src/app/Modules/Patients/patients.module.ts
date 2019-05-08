import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../Shared/shared.module';

import { AuthGuard } from 'src/common/app/Services/auth.guard';

import { PatientListComponent } from 'src/app/Modules/Patients/Components/patient-list.component';
import { PatientDetailComponent } from 'src/app/Modules/Patients/Components/patient-detail.component';
import { PatientEditComponent } from 'src/app/Modules/Patients/Components/patient-edit.component';
import { EditComponent } from 'src/app/Modules/Patients/Components/edit.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: '', component: PatientListComponent },
      { path: ':id', component: PatientDetailComponent },
      { path: 'edit/:id', component: PatientEditComponent },
    ]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    PatientListComponent,
    PatientDetailComponent,
    PatientEditComponent,
    EditComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class PatientsModule { }
