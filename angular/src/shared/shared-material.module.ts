import {NgModule} from '@angular/core';

import {
  MatDatepickerModule,MatNativeDateModule,MatSelectModule,MatInputModule
} from '@angular/material';

@NgModule({
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class SharedMaterialModule {

}