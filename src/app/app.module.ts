import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { MaterialComponentsModule } from './materialcomponents.module';
import { SharedModule } from './shared.module';
import { AppRoutingModule } from './app-routing.module';
import { FirebaseModule } from './firebase.module';
//import 'hammerjs';

// services
import { GlobalService } from '@services/global.service';
import { WindowRefService } from "@services/window-ref.service";
import { LocalCartService } from "@services/localcart.service";

// directives
import { StopPropagationDirective } from './directives/stop-propagation.directive';
import { LoginComponent } from './public/components/login/login.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MaterialComponentsModule,
    SharedModule,
    FirebaseModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    StopPropagationDirective,
  ],
  providers: [ GlobalService, WindowRefService, LocalCartService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
