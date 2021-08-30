
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MaterialComponentsModule } from '../materialcomponents.module';
import { SharedModule } from '../shared.module';
import { MainComponent } from './main.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';


@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    MaterialComponentsModule,
  ],
  declarations: [
    MainComponent,
    CartIconComponent
  ]
})
export class MainModule { }
