import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialComponentsModule } from 'app/materialcomponents.module';
import { SharedModule } from 'app/shared.module';

import { AppComponent } from 'app/app.component';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import 'firebase/storage';
import * as firebase from 'firebase';

import { AppRoutingModule } from 'app/app-routing.module';

// components
import { CartComponent } from 'app/storefront-components/cart/cart.component';
import { CartIconComponent } from 'app/storefront-components/cart-icon/cart-icon.component';
import { CheckoutBillingComponent } from 'app/storefront-components/checkout-billing/checkout-billing.component';
import { CheckoutConfirmationComponent } from 'app/storefront-components/checkout-confirmation/checkout-confirmation.component';
import { CheckoutPaymentComponent } from 'app/storefront-components/checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from 'app/storefront-components/checkout-review/checkout-review.component';
import { CheckoutShippingComponent } from 'app/storefront-components/checkout-shipping/checkout-shipping.component';
import { DeleteDialogComponent } from 'app/admin-components/delete-dialog/delete-dialog.component';
import { LoginComponent } from 'app/admin-components/login/login.component';
import { OrderComponent } from 'app/storefront-components/order/order.component';
import { OrdersComponent } from 'app/storefront-components/orders/orders.component';
import { PageComponent } from 'app/storefront-components/page/page.component';
import { PagesComponent } from 'app/storefront-components/pages/pages.component';
import { PostComponent } from 'app/storefront-components/post/post.component';
import { PostsComponent } from 'app/storefront-components/posts/posts.component';
import { ProductComponent } from 'app/storefront-components/product/product.component';
import { ProductsComponent } from 'app/storefront-components/products/products.component';

// services
import { GlobalService } from 'app/services/global.service';
import { WindowRefService } from 'app/services/window-ref.service';
import { LocalCartService } from 'app/services/localcart.service';

firebase.initializeApp(environment.firebase);

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'firebase-cms'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NoopAnimationsModule,
    FormsModule,
    MaterialComponentsModule,
    SharedModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    PostsComponent,
    LoginComponent,
    PagesComponent,
    PageComponent,
    PostComponent,
    DeleteDialogComponent,
    ProductsComponent,
    ProductComponent,
    CartComponent,
    CartIconComponent,
    CheckoutShippingComponent,
    CheckoutBillingComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    CheckoutConfirmationComponent,
    OrdersComponent,
    OrderComponent,
  ],
  entryComponents: [DeleteDialogComponent],
  providers: [GlobalService, WindowRefService, LocalCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
