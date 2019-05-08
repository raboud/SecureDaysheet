import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/common/app/Services/auth.guard';

import { SharedModule } from '../Shared/shared.module';

import { MessageListComponent } from './Components/message-list.component';
import { MessageDetailComponent } from './Components/message-detail.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: '', component: MessageListComponent },
      { path: ':id', component: MessageDetailComponent },
    ]},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    MessageListComponent,
    MessageDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class MessagesModule { }
