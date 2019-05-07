import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/common/app/Services/auth.guard';
import { PatientListComponent } from 'src/app/Components/patient/patient-list.component';
import { PatientDetailComponent } from 'src/app/Components/patient/patient-detail.component';
import { PatientEditComponent } from 'src/app/Components/patient/patient-edit.component';
import { EditComponent } from 'src/app/Components/patient/edit.component';
import { SecureCommonModule } from 'src/common/app/secure-common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: '', component: PatientListComponent },
      { path: ':id', component: PatientDetailComponent },
      { path: 'edit/:id', component: PatientEditComponent },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    PatientListComponent,
    PatientDetailComponent,
    PatientEditComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecureCommonModule,
    NgbModule,
    FormsModule,
  ]
})
export class PatientsModule { }
