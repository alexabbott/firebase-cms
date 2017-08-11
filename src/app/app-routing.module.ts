import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

import { AuthGuard } from 'app/services/auth.guard';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'account',
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
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'add-customer', component: AddCustomerComponent },
          { path: 'add-order', component: AddOrderComponent },
          { path: 'add-page', component: AddPageComponent },
          { path: 'add-post', component: AddPostComponent },
          { path: 'add-product', component: AddProductComponent },
          { path: 'add-admin', component: AddAdminComponent },
          { path: 'customer/:key', component: AdminCustomerComponent },
          { path: 'customers', component: AdminCustomersComponent },
          { path: 'edit-customer/:uid', component: AddCustomerComponent },
          { path: 'edit-order/:key', component: AddOrderComponent },
          { path: 'edit-page/:key', component: AddPageComponent },
          { path: 'edit-post/:key', component: AddPostComponent },
          { path: 'edit-product/:key', component: AddProductComponent },
          { path: 'menus', component: AdminMenusComponent },
          { path: 'orders', component: AdminOrdersComponent },
          { path: 'order/:key', component: OrderComponent },
          { path: 'pages', component: AdminPagesComponent },
          { path: 'posts', component: AdminPostsComponent },
          { path: 'products', component: AdminProductsComponent },
          { path: 'theme', component: AdminThemeComponent },
          { path: 'admins', component: AdminAdminsComponent },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  },
  { path: 'checkout',
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
