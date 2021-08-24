import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialComponentsModule } from '../materialcomponents.module';
import { SharedModule } from '../shared.module';
import { CKEditorModule } from 'ng2-ckeditor';

import { StoreComponent } from './store.component';
import { OrderComponent } from './storefront-components/order/order.component';
import { OrdersComponent } from './storefront-components/orders/orders.component';
import { PostsComponent } from './storefront-components/posts/posts.component';
import { PagesComponent } from './storefront-components/pages/pages.component';
import { PageComponent } from './storefront-components/page/page.component';
/*import { PostComponent } from './storefront-components/post/post.component';*/
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
import { StoreRoutingModule } from './store-routing.module';

@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    FormsModule,
    MaterialComponentsModule,
    SharedModule,
    CKEditorModule,
  ],
  declarations: [
    StoreComponent,
    OrderComponent,
    OrdersComponent,
    PostsComponent,
    PagesComponent,
   /* PageComponent,*/
 /*   PostComponent,*/
    ProductsComponent,
    ProductComponent,
    CartComponent,
    CartIconComponent,
    CheckoutShippingComponent,
    CheckoutBillingComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    CheckoutConfirmationComponent,
    ProductCategoryComponent,
    ProductCategoriesComponent,
    SearchResultsComponent
  ]
})
export class StoreModule {}
