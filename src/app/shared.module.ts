import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MaterialComponentsModule } from 'app/materialcomponents.module';

// Components
import { OrderComponent } from 'app/storefront-components/order/order.component';

// Pipes
import { SortPipe } from 'app/pipes/sort.pipe';
import { SafeHtmlPipe } from 'app/pipes/safe-html.pipe';
import { TruncatePipe } from 'app/pipes/truncate.pipe';
import { GetUserPipe } from 'app/pipes/getUser.pipe';
import { ObjectCountPipe } from 'app/pipes/object-count.pipe';
import { GetKeyPipe } from 'app/pipes/get-key.pipe';
import { SearchPipe } from 'app/pipes/search.pipe';

const pipes = [
  GetUserPipe,
  GetKeyPipe,
  ObjectCountPipe,
  SafeHtmlPipe,
  SortPipe,
  TruncatePipe,
  SearchPipe
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialComponentsModule
  ],
  declarations: [
    ...pipes,
    OrderComponent
  ],
  exports: [
    ...pipes,
    RouterModule
  ]
})
export class SharedModule { }