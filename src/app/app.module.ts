import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from 'app/app.component';
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
import { PostsComponent } from 'app/storefront-components/posts/posts.component';
import { AdminComponent } from 'app/admin-components/admin/admin.component';
import { LoginComponent } from 'app/admin-components/login/login.component';
import { AddPostComponent } from 'app/admin-components/add-post/add-post.component';
import { AdminPostsComponent } from 'app/admin-components/admin-posts/admin-posts.component';
import { AdminAdminsComponent } from 'app/admin-components/admin-admins/admin-admins.component';
import { AdminDashboardComponent } from 'app/admin-components/admin-dashboard/admin-dashboard.component';
import { AddAdminComponent } from 'app/admin-components/add-admin/add-admin.component';
import { PagesComponent } from 'app/storefront-components/pages/pages.component';
import { AdminPagesComponent } from 'app/admin-components/admin-pages/admin-pages.component';
import { PageComponent } from 'app/storefront-components/page/page.component';
import { AddPageComponent } from 'app/admin-components/add-page/add-page.component';
import { PostComponent } from 'app/storefront-components/post/post.component';
import { AdminMenusComponent } from 'app/admin-components/admin-menus/admin-menus.component';
import { AdminThemeComponent } from 'app/admin-components/admin-theme/admin-theme.component';
import { ProductsComponent } from 'app/storefront-components/products/products.component';
import { ProductComponent } from 'app/storefront-components/product/product.component';
import { AdminProductsComponent } from 'app/admin-components/admin-products/admin-products.component';
import { AddProductComponent } from 'app/admin-components/add-product/add-product.component';
import { CartComponent } from 'app/storefront-components/cart/cart.component';
import { DeleteDialogComponent } from 'app/admin-components/delete-dialog/delete-dialog.component';
import { CartIconComponent } from 'app/storefront-components/cart-icon/cart-icon.component';
import { AdminCustomersComponent } from 'app/admin-components/admin-customers/admin-customers.component';
import { CheckoutShippingComponent } from 'app/storefront-components/checkout-shipping/checkout-shipping.component';
import { CheckoutBillingComponent } from 'app/storefront-components/checkout-billing/checkout-billing.component';
import { CheckoutPaymentComponent } from 'app/storefront-components/checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from 'app/storefront-components/checkout-review/checkout-review.component';
import { CheckoutConfirmationComponent } from 'app/storefront-components/checkout-confirmation/checkout-confirmation.component';
import { AddOrderComponent } from 'app/admin-components/add-order/add-order.component';
import { AddCustomerComponent } from 'app/admin-components/add-customer/add-customer.component';
import { OrdersComponent } from 'app/storefront-components/orders/orders.component';
import { OrderComponent } from 'app/storefront-components/order/order.component';
import { AdminOrdersComponent } from 'app/admin-components/admin-orders/admin-orders.component';
import { AdminCustomerComponent } from 'app/admin-components/admin-customer/admin-customer.component';

// services
import { GlobalService } from 'app/services/global.service';
import { WindowRefService } from 'app/services/window-ref.service';
import { LocalCartService } from 'app/services/localcart.service';

// guards
import { AuthGuard } from 'app/services/auth.guard';

// pipes
import { SortPipe } from 'app/pipes/sort.pipe';
import { SafeHtmlPipe } from 'app/pipes/safe-html.pipe';
import { TruncatePipe } from 'app/pipes/truncate.pipe';
import { GetPipe } from 'app/pipes/get.pipe';
import { ObjectCountPipe } from 'app/pipes/object-count.pipe';

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
  providers: [ GlobalService, AuthGuard, WindowRefService, LocalCartService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
