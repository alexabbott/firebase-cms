import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { MdButtonModule, MdInputModule, MdNativeDateModule, MdDatepickerModule, MdCardModule, MdSnackBarModule, MdSlideToggleModule, MdSidenavModule, MdToolbarModule } from '@angular/material';

// components
import { PostsComponent } from './posts/posts.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';

// services
import { GlobalService } from './global.service';
import { AuthGuard } from './auth-guard.service';

// pipes
import { SortPipe } from './sort.pipe';

const appRoutes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'firebase-cms'), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    BrowserAnimationsModule,
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdInputModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdToolbarModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  declarations: [ AppComponent, PostsComponent, AdminComponent, SortPipe, LoginComponent ],
  providers: [GlobalService, AuthGuard],
  bootstrap: [ AppComponent ]
})
export class AppModule {}