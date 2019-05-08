import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../Shared/shared.module';

import { AuthGuard } from 'src/common/app/Services/auth.guard';

import { ProviderListComponent } from './Components/provider-list.component';
import { ProviderDetailComponent } from './Components/provider-detail.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: '', component: ProviderListComponent },
      { path: ':id', component: ProviderDetailComponent },
    ]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ProviderListComponent,
    ProviderDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class ProvidersModule { }
