import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import 'firebase/storage';
import * as firebase from 'firebase';
import { CKEditorModule } from 'ng2-ckeditor';
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
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
  } from '@angular/material';
import 'hammerjs';
import { DndModule } from 'ng2-dnd';

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
import { AddPageComponent } from './add-page/add-page.component';
import { PostComponent } from './post/post.component';
import { AdminMenusComponent } from './admin-menus/admin-menus.component';
import { AdminThemeComponent } from './admin-theme/admin-theme.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';

// services
import { GlobalService } from './global.service';
import { AuthGuard } from './auth-guard.service';

// pipes
import { SortPipe } from './sort.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { TruncatePipe } from './truncate.pipe';

const appRoutes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'add-page', component: AddPageComponent },
          { path: 'add-post', component: AddPostComponent },
          { path: 'add-product', component: AddProductComponent },
          { path: 'add-admin', component: AddUserComponent },
          { path: 'customers', component: AdminCustomersComponent },
          { path: 'edit-page/:key', component: AddPageComponent },
          { path: 'edit-post/:key', component: AddPostComponent },
          { path: 'edit-product/:key', component: AddProductComponent },
          { path: 'menus', component: AdminMenusComponent },
          { path: 'pages', component: AdminPagesComponent },
          { path: 'posts', component: AdminPostsComponent },
          { path: 'products', component: AdminProductsComponent },
          { path: 'theme', component: AdminThemeComponent },
          { path: 'admins', component: AdminUsersComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'page/:url', component: PageComponent },
  { path: 'product/:url', component: ProductComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'blog', component: PostsComponent },
  { path: 'blog/:url', component: PostComponent },
  { path: 'cart', component: CartComponent },
];

firebase.initializeApp(environment.firebase);

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'firebase-cms'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    DndModule.forRoot(),
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdDatepickerModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
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
    AdminThemeComponent,
    SafeHtmlPipe,
    TruncatePipe,
    DeleteDialogComponent,
    ProductsComponent,
    ProductComponent,
    AdminProductsComponent,
    AddProductComponent,
    CartComponent,
    CartIconComponent,
    AdminCustomersComponent
  ],
  entryComponents: [DeleteDialogComponent],
  providers: [ GlobalService, AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}