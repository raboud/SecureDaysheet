import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../Shared/shared.module';

import { AuthGuard } from 'src/common/app/Services/auth.guard';

import { SettingListComponent } from './Components/setting-list.component';
import { SettingDetailsComponent } from './Components/setting-details.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: '', component: SettingListComponent },
      { path: ':id', component: SettingDetailsComponent }
    ]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    SettingListComponent,
    SettingDetailsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class SettingsModule { }
