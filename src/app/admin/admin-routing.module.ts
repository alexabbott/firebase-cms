import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from 'app/admin/admin-components/admin/admin.component';
import { AddPostComponent } from 'app/admin/admin-components/add-post/add-post.component';
import { AdminPostsComponent } from 'app/admin/admin-components/admin-posts/admin-posts.component';
import { AdminAdminsComponent } from 'app/admin/admin-components/admin-admins/admin-admins.component';
import { AdminDashboardComponent } from 'app/admin/admin-components/admin-dashboard/admin-dashboard.component';
import { AddAdminComponent } from 'app/admin/admin-components/add-admin/add-admin.component';
import { AdminPagesComponent } from 'app/admin/admin-components/admin-pages/admin-pages.component';
import { AddPageComponent } from 'app/admin/admin-components/add-page/add-page.component';
import { AdminMenusComponent } from 'app/admin/admin-components/admin-menus/admin-menus.component';
import { AdminThemeComponent } from 'app/admin/admin-components/admin-theme/admin-theme.component';
import { AdminProductsComponent } from 'app/admin/admin-components/admin-products/admin-products.component';
import { AddProductComponent } from 'app/admin/admin-components/add-product/add-product.component';
import { DeleteDialogComponent } from 'app/admin/admin-components/delete-dialog/delete-dialog.component';
import { AdminCustomersComponent } from 'app/admin/admin-components/admin-customers/admin-customers.component';
import { AddOrderComponent } from 'app/admin/admin-components/add-order/add-order.component';
import { AddCustomerComponent } from 'app/admin/admin-components/add-customer/add-customer.component';
import { AdminOrdersComponent } from 'app/admin/admin-components/admin-orders/admin-orders.component';
import { AdminCustomerComponent } from 'app/admin/admin-components/admin-customer/admin-customer.component';
import { AdminProductCategoriesComponent } from 'app/admin/admin-components/admin-product-categories/admin-product-categories.component';
import { AddProductCategoryComponent } from 'app/admin/admin-components/add-product-category/add-product-category.component';
import { AdminApprovalsComponent } from 'app/admin/admin-components/admin-approvals/admin-approvals.component';
import { ApproveDialogComponent } from 'app/admin/admin-components/approve-dialog/approve-dialog.component';
import { OrderComponent } from 'app/storefront-components/order/order.component';
import { OrdersComponent } from 'app/storefront-components/orders/orders.component';

import { AuthGuard } from 'app/services/auth.guard';
import { SuperAdminGuard } from 'app/services/super-admin.guard';
import { AdminGuard } from 'app/services/admin.guard';

const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'add-customer', component: AddCustomerComponent, canActivate: [AdminGuard] },
          { path: 'add-order', component: AddOrderComponent, canActivate: [AdminGuard] },
          { path: 'add-page', component: AddPageComponent },
          { path: 'add-post', component: AddPostComponent },
          { path: 'add-product', component: AddProductComponent },
          { path: 'add-product-category', component: AddProductCategoryComponent },
          { path: 'add-admin', component: AddAdminComponent, canActivate: [SuperAdminGuard] },
          { path: 'approvals', component: AdminApprovalsComponent },
          { path: 'category-approval/:key', component: AddProductCategoryComponent },
          { path: 'page-approval/:key', component: AddPageComponent },
          { path: 'product-approval/:key', component: AddProductComponent },
          { path: 'post-approval/:key', component: AddPostComponent },
          { path: 'product-categories', component: AdminProductCategoriesComponent },
          { path: 'customer/:key', component: OrdersComponent, canActivate: [AdminGuard] },
          { path: 'customers', component: AdminCustomersComponent, canActivate: [AdminGuard] },
          { path: 'edit-admin/:key', component: AddAdminComponent, canActivate: [SuperAdminGuard] },
          { path: 'edit-customer/:uid', component: AddCustomerComponent, canActivate: [AdminGuard] },
          { path: 'edit-order/:key', component: AddOrderComponent, canActivate: [AdminGuard] },
          { path: 'edit-page/:key', component: AddPageComponent },
          { path: 'edit-post/:key', component: AddPostComponent },
          { path: 'edit-product/:key', component: AddProductComponent },
          { path: 'edit-product-category/:key', component: AddProductCategoryComponent },
          { path: 'menus', component: AdminMenusComponent, canActivate: [AdminGuard] },
          { path: 'orders', component: AdminOrdersComponent, canActivate: [AdminGuard] },
          { path: 'order/:key', component: OrderComponent, canActivate: [AdminGuard] },
          { path: 'pages', component: AdminPagesComponent },
          { path: 'posts', component: AdminPostsComponent },
          { path: 'products', component: AdminProductsComponent },
          { path: 'theme', component: AdminThemeComponent, canActivate: [AdminGuard] },
          { path: 'admins', component: AdminAdminsComponent, canActivate: [SuperAdminGuard] },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
