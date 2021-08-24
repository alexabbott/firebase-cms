import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../materialcomponents.module';
import { SharedModule } from '../shared.module';
import { FormsModule } from '@angular/forms';
import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './components/login/login.component';
import { PublicComponent } from './public.component';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    MaterialComponentsModule,
    SharedModule,
  ],
  declarations: [
    PublicComponent,
    LoginComponent
  ]
})
export class PublicModule {}
