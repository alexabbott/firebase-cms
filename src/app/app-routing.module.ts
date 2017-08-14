import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from 'app/storefront-components/posts/posts.component';

import { OrdersComponent } from 'app/storefront-components/orders/orders.component';
import { OrderComponent } from 'app/storefront-components/order/order.component';

import { CheckoutShippingComponent } from 'app/storefront-components/checkout-shipping/checkout-shipping.component';
import { CheckoutBillingComponent } from 'app/storefront-components/checkout-billing/checkout-billing.component';
import { CheckoutPaymentComponent } from 'app/storefront-components/checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from 'app/storefront-components/checkout-review/checkout-review.component';
import { CheckoutConfirmationComponent } from 'app/storefront-components/checkout-confirmation/checkout-confirmation.component';

import { LoginComponent } from 'app/admin-components/login/login.component';
import { PageComponent } from 'app/storefront-components/page/page.component';
import { ProductComponent } from 'app/storefront-components/product/product.component';
import { ProductsComponent } from 'app/storefront-components/products/products.component';
import { PostComponent } from 'app/storefront-components/post/post.component';
import { CartComponent } from 'app/storefront-components/cart/cart.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  {
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
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
  {
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
  { path: 'login', component: LoginComponent },
  { path: 'page/:url', component: PageComponent },
  { path: 'product/:url', component: ProductComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'blog', component: PostsComponent },
  { path: 'blog/:url', component: PostComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
