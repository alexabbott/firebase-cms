import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
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
    MdSelectModule,
    MdOptionModule,
    MdCheckboxModule,
    MdMenuModule,
  } from '@angular/material';
import 'hammerjs';
import { DndModule } from 'ng2-dnd';
import { AppRoutingModule } from 'app/app-routing.module';

// components
import { PostsComponent } from './storefront-components/posts/posts.component';
import { AdminComponent } from './admin-components/admin/admin.component';
import { LoginComponent } from './admin-components/login/login.component';
import { AddPostComponent } from './admin-components/add-post/add-post.component';
import { AdminPostsComponent } from './admin-components/admin-posts/admin-posts.component';
import { AdminAdminsComponent } from './admin-components/admin-admins/admin-admins.component';
import { AdminDashboardComponent } from './admin-components/admin-dashboard/admin-dashboard.component';
import { AddAdminComponent } from './admin-components/add-admin/add-admin.component';
import { PagesComponent } from './storefront-components/pages/pages.component';
import { AdminPagesComponent } from './admin-components/admin-pages/admin-pages.component';
import { PageComponent } from './storefront-components/page/page.component';
import { AddPageComponent } from './admin-components/add-page/add-page.component';
import { PostComponent } from './storefront-components/post/post.component';
import { AdminMenusComponent } from './admin-components/admin-menus/admin-menus.component';
import { AdminThemeComponent } from './admin-components/admin-theme/admin-theme.component';
import { ProductsComponent } from './storefront-components/products/products.component';
import { ProductComponent } from './storefront-components/product/product.component';
import { AdminProductsComponent } from './admin-components/admin-products/admin-products.component';
import { AddProductComponent } from './admin-components/add-product/add-product.component';
import { CartComponent } from './storefront-components/cart/cart.component';
import { DeleteDialogComponent } from './admin-components/delete-dialog/delete-dialog.component';
import { CartIconComponent } from './storefront-components/cart-icon/cart-icon.component';
import { AdminCustomersComponent } from './admin-components/admin-customers/admin-customers.component';
import { CheckoutShippingComponent } from './storefront-components/checkout-shipping/checkout-shipping.component';
import { CheckoutBillingComponent } from './storefront-components/checkout-billing/checkout-billing.component';
import { CheckoutPaymentComponent } from './storefront-components/checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from './storefront-components/checkout-review/checkout-review.component';
import { CheckoutConfirmationComponent } from './storefront-components/checkout-confirmation/checkout-confirmation.component';
import { AddOrderComponent } from './admin-components/add-order/add-order.component';
import { AddCustomerComponent } from './admin-components/add-customer/add-customer.component';
import { OrdersComponent } from './storefront-components/orders/orders.component';
import { OrderComponent } from './storefront-components/order/order.component';
import { AdminOrdersComponent } from './admin-components/admin-orders/admin-orders.component';
import { AdminCustomerComponent } from './admin-components/admin-customer/admin-customer.component';

// services
import { GlobalService } from './services/global.service';
import { AuthGuard } from './services/auth.guard';

// pipes
import { SortPipe } from './pipes/sort.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { GetPipe } from './pipes/get.pipe';
import { ObjectCountPipe } from './pipes/object-count.pipe';

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
    AppRoutingModule,
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
    AdminAdminsComponent,
    AddAdminComponent,
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
    AdminCustomersComponent,
    CheckoutShippingComponent,
    CheckoutBillingComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    CheckoutConfirmationComponent,
    OrdersComponent,
    OrderComponent,
    AdminOrdersComponent,
    GetPipe,
    AddOrderComponent,
    AddCustomerComponent,
    ObjectCountPipe,
    AdminCustomerComponent
  ],
  entryComponents: [DeleteDialogComponent],
  providers: [ GlobalService, AuthGuard ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
