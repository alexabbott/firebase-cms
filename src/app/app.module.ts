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
import { MdButtonModule,
    MdInputModule,
    MdNativeDateModule,
    MdDatepickerModule,
    MdCardModule,
    MdSnackBarModule,
    MdSlideToggleModule,
    MdSidenavModule,
    MdToolbarModule,
    MdListModule,
    MdDialogModule
  } from '@angular/material';
import { CKEditorModule } from 'ng2-ckeditor';

// components
import { PostsComponent } from './posts/posts.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AdminPostsComponent } from './admin-posts/admin-posts.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { PagesComponent } from './pages/pages.component';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { PageComponent } from './page/page.component';

// services
import { GlobalService } from './global.service';
import { AuthGuard } from './auth-guard.service';

// pipes
import { SortPipe } from './sort.pipe';
import { AddPageComponent } from './add-page/add-page.component';
import { PostComponent } from './post/post.component';
import { AdminMenusComponent } from './admin-menus/admin-menus.component';
import { AdminThemeComponent } from './admin-theme/admin-theme.component';

const appRoutes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'add-page', component: AddPageComponent },
          { path: 'add-post', component: AddPostComponent },
          { path: 'add-user', component: AddUserComponent },
          { path: 'edit-page/:key', component: AddPageComponent },
          { path: 'edit-post/:key', component: AddPostComponent },
          { path: 'menus', component: AdminMenusComponent },
          { path: 'pages', component: AdminPagesComponent },
          { path: 'posts', component: AdminPostsComponent },
          { path: 'theme', component: AdminThemeComponent },
          { path: 'users', component: AdminUsersComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'page/:url', component: PageComponent },
  { path: 'blog', component: PostsComponent },
  { path: 'blog/:url', component: PostComponent },
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
    MdDialogModule,
    MdInputModule,
    MdListModule,
    MdNativeDateModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdToolbarModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    CKEditorModule
  ],
  declarations: [
    AppComponent,
    PostsComponent,
    AdminComponent,
    SortPipe,
    LoginComponent,
    AddPostComponent,
    AdminPostsComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    AddUserComponent,
    PagesComponent,
    AdminPagesComponent,
    PageComponent,
    AddPageComponent,
    PostComponent,
    AdminMenusComponent,
    AdminThemeComponent
  ],
  providers: [ GlobalService, AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}