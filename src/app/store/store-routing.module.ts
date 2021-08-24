import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { StoreComponent } from './store.component';

import { ProductCategoriesComponent } from './storefront-components/product-categories/product-categories.component';
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
import { SearchResultsComponent } from './storefront-components/search-results/search-results.component';
import { OrderComponent } from './storefront-components/order/order.component';

const routes: Routes = [
  <Route>{
    path: '', component: StoreComponent,
    children: [
      <Route>{ path: '', component: ProductCategoriesComponent },
      <Route>{
        path: 'account',
        children: [
          {
            path: '',
            children: [
              { path: 'orders', component: OrdersComponent },
              { path: 'order/:key', component: OrderComponent },
            ]
          }
        ]
      },
      <Route>{
        path: 'checkout',
        children: [
          {
            path: '',
            children: [
              { path: 'shipping', component: CheckoutShippingComponent },
              { path: 'billing', component: CheckoutBillingComponent },
              { path: 'payment', component: CheckoutPaymentComponent },
              { path: 'review', component: CheckoutReviewComponent },
              { path: 'confirmation', component: CheckoutConfirmationComponent },
            ]
          }
        ]
      },
      <Route>{ path: 'category/:slug', component: ProductCategoryComponent },
      //{ path: 'login', component: LoginComponent },
      //{ path: 'register', component: LoginComponent },
/*      <Route>{ path: 'page/:url', component: PageComponent },*/
      <Route>{ path: 'product/:url', component: ProductComponent },
      <Route>{ path: 'products', component: ProductsComponent },
   /*   <Route>{ path: 'blog', component: PostsComponent },*/
/*      <Route>{ path: 'blog/:url', component: PostComponent },*/
      <Route>{ path: 'cart', component: CartComponent },
      <Route>{ path: 'search', component: SearchResultsComponent },
    ]
   
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {}
