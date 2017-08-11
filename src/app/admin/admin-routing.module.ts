import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AdminComponent } from 'app/admin-components/admin/admin.component';
import { AddCustomerComponent } from 'app/admin-components/add-customer/add-customer.component';
import { AddOrderComponent } from 'app/admin-components/add-order/add-order.component';
import { AddPageComponent } from 'app/admin-components/add-page/add-page.component';
import { AddPostComponent } from 'app/admin-components/add-post/add-post.component';
import { AddProductComponent } from 'app/admin-components/add-product/add-product.component';
import { AddAdminComponent } from 'app/admin-components/add-admin/add-admin.component';
import { AdminCustomersComponent } from 'app/admin-components/admin-customers/admin-customers.component';
import { AdminMenusComponent } from 'app/admin-components/admin-menus/admin-menus.component';
import { AdminOrdersComponent } from 'app/admin-components/admin-orders/admin-orders.component';
import { OrdersComponent } from 'app/storefront-components/orders/orders.component';
import { OrderComponent } from 'app/storefront-components/order/order.component';
import { AdminPagesComponent } from 'app/admin-components/admin-pages/admin-pages.component';
import { AdminPostsComponent } from 'app/admin-components/admin-posts/admin-posts.component';
import { AdminProductsComponent } from 'app/admin-components/admin-products/admin-products.component';
import { AdminThemeComponent } from 'app/admin-components/admin-theme/admin-theme.component';
import { AdminAdminsComponent } from 'app/admin-components/admin-admins/admin-admins.component';
import { AdminDashboardComponent } from 'app/admin-components/admin-dashboard/admin-dashboard.component';

// Guards
import { AuthGuard } from 'app/services/auth.guard';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
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
          { path: 'customer/:key', component: OrdersComponent },
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
