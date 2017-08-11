import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import 'hammerjs';

import {
  MdButtonModule,
  MdNativeDateModule,
  MdInputModule,
  MdDatepickerModule,
  MdCardModule,
  MdSnackBarModule,
  MdSlideToggleModule,
  MdSidenavModule,
  MdToolbarModule,
  MdListModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdSelectModule,
  MdOptionModule,
  MdCheckboxModule,
  MdMenuModule,
} from '@angular/material';

const components = [
  CommonModule,
  MdButtonModule,
  MdCardModule,
  MdDatepickerModule,
  MdDialogModule,
  MdCheckboxModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdOptionModule,
  MdSelectModule,
  MdSidenavModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdToolbarModule,
];

@NgModule({
  imports: components,
  exports: components
})
export class MaterialComponentsModule { }
