import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Pipes
import { GetPipe } from 'app/pipes/get.pipe';
import { ObjectCountPipe } from 'app/pipes/object-count.pipe';
import { SafeHtmlPipe } from 'app/pipes/safe-html.pipe';
import { SortPipe } from 'app/pipes/sort.pipe';
import { TruncatePipe } from 'app/pipes/truncate.pipe';
const pipes = [
  GetPipe,
  ObjectCountPipe,
  SafeHtmlPipe,
  SortPipe,
  TruncatePipe
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ...pipes
  ],
  exports: [
    ...pipes
  ]
})
export class SharedModule { }
