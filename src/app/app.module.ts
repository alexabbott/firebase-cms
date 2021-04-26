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

// storefront components
import { OrdersComponent } from './storefront-components/orders/orders.component';
import { PostsComponent } from './storefront-components/posts/posts.component';
import { PagesComponent } from './storefront-components/pages/pages.component';
import { PageComponent } from './storefront-components/page/page.component';
import { PostComponent } from './storefront-components/post/post.component';
import { ProductsComponent } from './storefront-components/products/products.component';
import { ProductComponent } from './storefront-components/product/product.component';
import { CartComponent } from './storefront-components/cart/cart.component';
import { CartIconComponent } from './storefront-components/cart-icon/cart-icon.component';
import { CheckoutShippingComponent } from './storefront-components/checkout-shipping/checkout-shipping.component';
import { CheckoutBillingComponent } from './storefront-components/checkout-billing/checkout-billing.component';
import { CheckoutPaymentComponent } from './storefront-components/checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from './storefront-components/checkout-review/checkout-review.component';
import { CheckoutConfirmationComponent } from './storefront-components/checkout-confirmation/checkout-confirmation.component';
import { ProductCategoryComponent } from './storefront-components/product-category/product-category.component';
import { ProductCategoriesComponent } from './storefront-components/product-categories/product-categories.component';
import { SearchResultsComponent } from './storefront-components/search-results/search-results.component';
import { LoginComponent } from './storefront-components/login/login.component';

// services
import { GlobalService } from './services/global.service';
import { WindowRefService } from "./services/window-ref.service";
import { LocalCartService } from "./services/localcart.service";

// directives
import { StopPropagationDirective } from './directives/stop-propagation.directive';


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
    CartComponent,
    CartIconComponent,
    CheckoutShippingComponent,
    CheckoutBillingComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    CheckoutConfirmationComponent,
    LoginComponent,
    OrdersComponent,
    PagesComponent,
    PageComponent,
    PostComponent,
    PostsComponent,
    ProductsComponent,
    ProductComponent,
    ProductCategoryComponent,
    ProductCategoriesComponent,
    SearchResultsComponent,
    StopPropagationDirective,
  ],
  providers: [ GlobalService, WindowRefService, LocalCartService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
