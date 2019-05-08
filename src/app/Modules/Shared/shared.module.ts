import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SecureCommonModule } from 'src/common/app/secure-common.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    SecureCommonModule
  ],
  exports: [
//    CommonModule,
    NgbModule,
    FormsModule,
    SecureCommonModule
  ]
})
export class SharedModule { }
